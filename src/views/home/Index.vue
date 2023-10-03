<template>
  <main class="home-root">
    <banner-root />
    <fund-section />
  </main>
</template>

<script>
import BannerRoot from '@/components/Banner'
import FundSection from '@/views/funds/Section'

export default {
  name: 'Home',
  components: {
    BannerRoot,
    FundSection
  }
}
</script>
