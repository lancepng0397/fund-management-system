<template>
   <main class="container my-4">
    <div class="d-header d-flex justify-content-center gap-4 align-items-center mb-4">
      <div class="d-title">
        <h2 class="display-6 fw-light mb-0">Register</h2>
      </div>
    </div>
    <div class="container d-flex justify-content-center align-items-center">
      <div class="row border rounded-5 bg-white shadow box-area">
        <div class="col-md-6 rounded-img d-flex justify-content-center align-items-center flex-column left-box">
          <div class="featured-image mb-3 col-md-12 col-sm-12">
            <img src="../assets/img/funds.jpg" class="img-fluid rounded-4">
          </div>
          <p class="text-dark fs-2 img-font text-center">For a better future</p>
        </div>
        <div class="col-md-6 right-box">
          <div class="row align-items-center">
            <div class="header-text mb-4 text-center">
              <h2>Welcome, join us now!</h2>
            </div>
          </div>
          <form @submit.prevent="register" name="register-form" autocomplete="off">
            <div class="input-group mb-3">
              <input v-model="email" type="email" name="email" class="form-control form-control-lg bg-light fs-6" placeholder="Enter email">
            </div>
            <div class="input-group mb-3">
              <input v-model="password" type="password" name ="password" class="form-control form-control-lg bg-light fs-6" placeholder="Password" autocomplete="new-password">
            </div>
            <div class="input-group mb-3">
              <button class="btn btn-lg btn-primary w-100 fs-6" @click="register">Register</button>
            </div>
            <br>
            <div class="error" v-html="error" />
            <br>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
  .left-box {
    background: #ecdcc3
  }

  .error {
    color: red
  }

  .box-area{
    width: 930px;
  }

  .img-font {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
  }

  .header-text {
    font-family: 'Verdana', monospace;
  }

  /*------------ Right box ------------*/
  .right-box {
    padding: 40px 30px 40px 40px;
  }

  /*------------ Custom Placeholder ------------*/
  ::placeholder {
    font-size: 16px;
  }

  .rounded-img {
    border-radius: 20px 0 0 20px;
  }
  .rounded-4{
    border-radius: 20px;
  }
  .rounded-5{
    border-radius: 30px;
  }
  /*------------ For small screens------------*/
  @media only screen and (max-width: 768px){
      .box-area{
        margin: 0 10px;
      }
      .left-box{
        overflow: hidden;
      }
      .right-box{
        padding: 20px;
      }
      .rounded-img {
        border-radius: 20px 20px 0 0;
      }
  }
</style>
