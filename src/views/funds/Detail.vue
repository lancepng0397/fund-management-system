<template>
  <div class="d-header d-flex gap-4 align-items-center mb-4">
    <div class="d-title">
      <h2 v-if="localFundData" class="display-6 fw-light mb-0">{{ localFundData.fundName }}</h2>
    </div>
    <div v-if="localFundData" class="d-ticker ms-auto">
      <div class="display-6 fw-light">{{ localFundData.fundNAV }} MYR</div>
    </div>
  </div>
  <div class="row gy-3">
    <div class="col-lg-3 order-2 order-lg-1">
      <div class="border rounded">
        <div class="px-3 pt-3">
          <h3 class="fs-4 fw-normal">List of Funds</h3>
        </div>
        <div class="list-group list-group-flush">
          <list view="list-item" />
        </div>
      </div>
    </div>
    <div class="col-lg-9 order-1 order-lg-2">
      <div class="calculator-root">
        <h3 class="fs-4 fw-normal">Buy Fund</h3>
        <template v-if="localFundData && isUserLoggedIn">
          <Calculator v-bind:fundData="localFundData" />
        </template>
        <template v-else>
          <p>Please login to buy this fund.</p>
        </template>
      </div>
      <div v-if="localFundData" class="border rounded p-3 mt-4">
        <h3 class="fs-4 fw-normal">{{ localFundData.fundName }} Performance Chart</h3>
        <fund-chart :chart-data="chartData" :chart-options="chartOptions"></fund-chart>
      </div>
      <div class="mt-4">
        <h3 class="fs-4 fw-normal">Overview</h3>
        <div class="d-flex flex-column flex-xl-row gap-3">
          <div class="d-ticker-card border rounded pt-3 pb-2 ps-3 pe-4">
            <div class="d-ticker-card-header d-flex align-items-center gap-3">
              <div v-if="localFundData" class="d-ticker-card-title">
                <h2 class="fs-6 fw-bold mb-0">{{ localFundData.fundName }}</h2>
                <h3 class="fs-6 fw-light mb-0">{{ localFundData.fundType }}</h3>
              </div>
            </div>
            <div v-if="localFundData" class="d-ticker-card-body mt-2 text-nowrap">
              <span class="d-ticker-card-price fs-3 fw-bold">{{ localFundData.fundNAV }} MYR</span>
            </div>
          </div>
          <div class="d-ticker-card border rounded pt-3 pb-2 ps-3 pe-4 flex-fill">
            <div class="d-ticker-card-header">
              <div class="d-ticker-card-title">
                <h3 class="fs-6 fw-normal mb-0 text-nowrap">Lorem Ipsum</h3>
              </div>
            </div>
            <div class="d-ticker-card-body mt-2">
              <div class="position-relative py-4">
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sapien orci, sollicitudin pretium iaculis sed, sagittis blandit ligula. Vestibulum malesuada sit amet purus nec elementum.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="localFundData" class="border rounded p-3 mt-4">
        <h3 class="fs-4 fw-normal">What is {{ localFundData.fundName }}?</h3>
        <p>{{ localFundData.fundDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FundsService from '@/services/FundsService'
import Calculator from './Calculator'
import List from './List'
import FundChart from './FundChart'
export default {
  name: 'Detail',
  components: {
    Calculator,
    List,
    FundChart
  },
  props: {
    fundData: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      isUserLoggedIn: state => state.isUserLoggedIn
    })
  },
  data () {
    return {
      localFundData: null,
      chartData: {
        labels: ['03 Oct 2023', '04 Oct 2023', '05 Oct 2023', '06 Oct 2023', '07 Oct 2023', '08 Oct 2023'],
        datasets: [
          {
            label: 'Fund NAV',
            data: [100, 105, 110, 108, 112, 115]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: false
          }
        }
      }
    }
  },
  watch: {
    '$route.params.fundSlug': 'fetchFundDataBySlug'
  },
  methods: {
    async fetchFundDataBySlug () {
      try {
        const fundSlug = this.$route.params.fundSlug // Get the fundSlug from the route parameters
        const response = await FundsService.getBySlug(fundSlug)
        const fundData = response.data
        this.localFundData = fundData
      } catch (error) {
        console.error('Error fetching fund data by slug:', error)
      }
    }
  },
  async mounted () {
    this.fetchFundDataBySlug()
  }
}
</script>

<style scoped>
.d-header {
  min-height: 74px;
}
.d-progress {
  height: 10px;
}
.placeholder__tools {
  height: 34px;
}
.placeholder__calculator {
  height: 82px;
}
</style>

<style>
.chart-aspect {
  height: 0;
  position: relative;
  padding-top: 56.25%;
}
</style>
