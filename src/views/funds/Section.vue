<template>
  <div class="container my-4">
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <caption class="display-6 caption-top">
          Live Prices
        </caption>
        <thead class="table-head">
          <tr>
            <th>Fund Name</th>
            <th class="text-end">Daily Price Change</th>
            <th class="text-end">Price</th>
            <th class="text-end"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <list view="table-row" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import List from './List'
import { mapState } from 'vuex'
export default {
  name: 'FundSection',
  props: {
    fundData: {
      type: Object,
      default: null
    }
  },
  components: {
    List
  },
  computed: {
    ...mapState(['funds'])
  }
}
</script>

<style scoped>
.table-head {
  color: var(--bs-gray-500);
  font-size: 13px;
  border-width: 2px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-left-width: 0px;
}
.table-body {
  border-width: 1px;
  border-right-width: 0px;
  border-left-width: 0px;
  border-bottom-width: 0px;
  font-size: 17px;
  white-space: nowrap;
}
</style>
