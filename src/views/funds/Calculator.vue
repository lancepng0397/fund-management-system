<template>
  <div class="d-flex align-items-center">
    <div class="col-12 col-lg-12 border rounded flex-fill p-3 d-flex gap-3 align-items-center">
      <div class="d-ticker-card-title">
        <h2 class="fs-6 fw-bold mb-0">{{ fundData.fundName }}</h2>
      </div>
      <div class="w-50 d-flex">
        <input
          type="number"
          class="form-control"
          placeholder="Quantity"
          v-model.number="quantity"
        />
        <button class="btn btn-success ms-1"
        @click="buyFund">Buy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  props: {
    fundData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      quantity: 0
    }
  },
  computed: {
  },
  methods: {
    async buyFund () {
      if (this.fundData) {
        await this.$store.dispatch('buyFund', {
          fundId: this.fundData.id,
          quantity: this.quantity,
          buyFundData: this.fundData
        })
      } else {
        console.error('Invalid fundId')
      }
    }
  }
}
</script>
