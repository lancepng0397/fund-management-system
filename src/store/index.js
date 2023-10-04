import { createStore } from 'vuex'
import FundsService from '@/services/FundsService'

export default createStore({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    balance: 10000,
    portfolio: [],
    funds: {},
    isDataFetched: false
  },
  getters: {
    // Getter to retrieve fund data by ID
    getFundById: (state) => (id) => {
      const fundData = Object.values(state.funds).find(fund => fund.id === id)
      return fundData || {}
    }
  },
  mutations: {
    SET_DATA_FETCHED (state, value) {
      state.isDataFetched = value
    },
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    UPDATE_FUND_DATA (state, { fundId, fundData }) {
      // Update the state with the data received from FundsService
      state.funds[fundId] = fundData
    },
    DECREASE_BALANCE (state, amount) {
      state.balance -= amount
    },
    INCREASE_BALANCE (state, amount) {
      state.balance += amount
    },
    ADD_TO_PORTFOLIO (state, { fundId, quantity }) {
      // Add the fund to the user's portfolio or update the quantity if it already exists
      const portfolioItem = state.portfolio.find(item => item.fundId === fundId)

      if (portfolioItem) {
        portfolioItem.quantity += quantity
      } else {
        state.portfolio.push({ fundId, quantity })
      }
    },
    SELL_FROM_PORTFOLIO (state, { fundId, quantity }) {
      // Subtract the sold quantity from the user's portfolio
      const portfolioItem = state.portfolio.find(item => item.fundId === fundId)

      if (portfolioItem) {
        portfolioItem.quantity -= quantity

        // Remove the portfolio item if the quantity becomes zero
        if (portfolioItem.quantity <= 0) {
          state.portfolio = state.portfolio.filter(item => item.fundId !== fundId)
        }
      }
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    updateFundData ({ commit }, { fundId, fundData }) {
      commit('UPDATE_FUND_DATA', { fundId, fundData })
    },
    async fetchFunds ({ commit, state }) {
      try {
        const response = await FundsService.index() // FundsService.index() fetches the funds data
        const fundData = response.data

        // Update Vuex store with the fetched fund data
        Object.keys(fundData).forEach((fundId) => {
          const fundDataItem = fundData[fundId]

          // Check if the fund already exists in the store
          if (fundId in state.funds) {
            // If it exists, merge the new data with the existing data
            commit('UPDATE_FUND_DATA', { fundId, fundData: { ...state.funds[fundId], ...fundDataItem } })
          } else {
            // If it doesn't exist, add it to the store
            commit('UPDATE_FUND_DATA', { fundId, fundData: fundDataItem })
          }
        })
      } catch (error) {
        console.error('Error fetching fund data:', error)
      }
    },
    buyFund ({ commit, state }, { fundId, quantity, buyFundData }) {
      // Check if the user has enough balance to buy the fund
      if (buyFundData) {
        const fund = buyFundData
        const totalCost = fund.fundNAV * quantity

        if (state.balance >= totalCost) {
          // Deduct the cost from the user's balance
          commit('DECREASE_BALANCE', totalCost)

          // Add the bought fund to the user's portfolio
          commit('ADD_TO_PORTFOLIO', { fundId, quantity })
        } else {
          console.error('Insufficient balance')
        }
      } else {
        console.error('Invalid fundId')
      }
    },
    sellFund ({ commit, state }, { fundId, sellQuantity }) {
      // Check if the user has enough of the fund to sell
      const portfolioItem = state.portfolio.find(item => item.fundId === fundId)
      if (portfolioItem && portfolioItem.quantity >= sellQuantity && sellQuantity > 0) {
        // Calculate the amount to add to the user's balance
        const fundsArray = Object.values(state.funds)
        const fund = fundsArray.find(fund => fund.id === fundId)

        const saleAmount = fund.fundNAV * sellQuantity

        // Increase the user's balance
        commit('INCREASE_BALANCE', saleAmount)

        // Update the user's portfolio by subtracting the sold quantity
        commit('SELL_FROM_PORTFOLIO', { fundId, quantity: sellQuantity })
      } else {
        // Handle insufficient quantity error or invalid sellQuantity
        console.error('Invalid quantity to sell')
      }
    }
  },
  modules: {
  }
})
