<template>
    <div>
        <canvas ref="chartCanvas" width="400" height="200"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'FundChart',
  props: {
    chartData: Object,
    chartOptions: Object
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.renderChart()
  },
  watch: {
    chartData: 'renderChart'
  },
  methods: {
    renderChart () {
      if (this.chart) {
        this.chart.destroy()
      }

      const ctx = this.$refs.chartCanvas.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: {
          ...this.chartOptions,
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 2 // Limit the number of displayed ticks to 2
              }
            }
          }
        }
      })
    }
  }
}
</script>
