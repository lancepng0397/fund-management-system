<template>
  <main class="container my-4">
    <div class="row">
      <div class="d-title">
        <h2 class="display-6 fw-light mb-0">Your Portfolio</h2>
      </div>
      <div v-if="userPortfolio.length === 0" class="empty-portfolio-message">
        <p>You haven't bought any funds yet.</p>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="portfolioItem in userPortfolio" :key="portfolioItem.fundId">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">
                {{ portfolioItem.fundName }}
                <div class="row">
                  <small v-if="portfolioItem.fundNAV">(Price: {{ portfolioItem.fundNAV }} | Quantity: {{ portfolioItem.quantity }})</small>
                </div>
              </h5>
            </div>
            <div class="card-body">
              <div class="mb-2">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Quantity"
                  v-model.number="portfolioItem.sellQuantity"
                />
              </div>
              <div>
                <button
                class="btn btn-success"
                  @click="sellFund(portfolioItem)"
                >Sell</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['portfolio']),
    userPortfolio () {
      // Filter the user's portfolio based on the funds data
      return this.portfolio.map(portfolioItem => {
        const fundData = this.$store.getters.getFundById(portfolioItem.fundId)
        return {
          fundId: portfolioItem.fundId,
          fundName: fundData.fundName,
          fundNAV: fundData.fundNAV,
          quantity: portfolioItem.quantity,
          sellQuantity: 0 // Initialize sellQuantity to 0
        }
      })
    }
  },
  methods: {
    ...mapActions(['sellFund'])
  }
}
</script>

<style scoped>
.empty-portfolio-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh; /* Make it cover the entire viewport height */
  text-align: center; /* Center the text horizontally */
}
</style>
