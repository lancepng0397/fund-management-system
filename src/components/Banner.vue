<template>
  <section class="bg-light pulse animated highlight-phone">
    <div class="container">
      <div class="row d-lg-flex align-items-lg-center">
        <div class="col-md-8">
          <div class="intro">
            <p>We are here to help our clients build wealth and achieve their financial goals through their trust.</p>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="d-none d-md-block phone-mockup">
            <img class="device" src="../assets/img/phone.svg" alt="trading charts" />
            <div class="screen"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>
.phone-mockup {
  margin-top: 0px;
}
</style>
