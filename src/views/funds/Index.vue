<template>
  <main class="container my-4">
    <funds-detail />
  </main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'Funds',
  components: {
    FundsDetail: defineAsyncComponent(() =>
      import(/* webpackChunkName: "funds-detail" */ './Detail')
    )
  },
  props: {
    fundSlug: {
      type: String,
      default: null
    }
  }
}
</script>
