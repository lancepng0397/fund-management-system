<template>
  <template v-for="fund in funds" :key="fund.id">
    <component :is="view" :fundData="fund" />
  </template>
</template>

<script>
import { mapState } from 'vuex'
import TableRow from './TableRow'
import ListItem from './ListItem'

export default {
  name: 'List',
  props: {
    view: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState(['funds'])
  },
  components: {
    TableRow,
    ListItem
  },
  async mounted () {
    if (!this.$store.state.isDataFetched) {
      await this.$store.dispatch('fetchFunds')

      // Set the flag to true after the initial fetch
      this.$store.commit('SET_DATA_FETCHED', true)
    }
  }
}
</script>
