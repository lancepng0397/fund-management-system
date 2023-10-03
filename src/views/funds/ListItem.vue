<template>
  <router-link v-if="fundData" v-bind:to="'/funds/' + fundData.fundSlug" v-bind:title="fundData.fundName + ' Charts'" v-bind:class="'pt-3 list-group-item list-group-item-action'">
    <div class="d-flex w-100 justify-content-between">
      <div class="d-flex flex-row align-items-center">
        <h6 class="mb-0 pair-meta-symbol">{{ fundData.fundName }}</h6>
      </div>
      <small>
        <template v-if="fundData">{{ fundData.fundNAV }} MYR</template>
      </small>
    </div>
    <div class="d-flex w-100 justify-content-between">
      <small class="pair-meta-name" v-if="fundData">{{ fundData.fundType }}</small>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    fundData: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.pair-meta-symbol {
  margin-left: 17px;
}
.pair-meta-name {
  margin-left: 18px;
}
</style>
