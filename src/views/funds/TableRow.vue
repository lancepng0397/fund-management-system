<template>
  <tr  v-if="fundData" v-bind:class="'pair-row'">
    <td class="pair-meta">
      <div class="d-flex flex-row align-items-center">
        <span  v-if="fundData" class="pair-meta-symbol fw-bold">{{ fundData.fundName }}</span>
        <span  v-if="fundData" class="pair-meta-name">{{ fundData.fundType }}</span>
      </div>
    </td>
    <td v-bind:class="'pair-daily-change text-end color-'">
      <span>-</span>
    </td>
    <td class="text-end fw-bold">
      <span v-if="fundData">{{ fundData.fundNAV }}</span>
    </td>
    <td class="text-end">
      <div class="d-grid d-flex justify-content-end">
        <router-link  v-if="fundData" v-bind:to="'/funds/' + fundData.fundSlug" v-bind:class="'btn btn-light btn-sm col-lg-6'"
          role="button" v-bind:title="fundData.fundName + ' Charts'">Detail</router-link>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    fundData: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.pair-meta .pair-meta-symbol {
  margin-left: 17px;
}
.pair-meta .pair-meta-name {
  margin-left: 7px;
  color: var(--bs-gray)
}
.table-body tr td {
  padding-top: 16px;
  padding-bottom: 16px;
}
.table-body tr:last-child td {
  border-bottom-width: 0px;
}
</style>
