<template>
  <header class="navbar sticky-top navbar-light navbar-expand-lg navigation-clean">
    <div class="container">
      <h1 class="mb-0">
        <router-link class="navbar-brand" to="/" title="Funds">Fund Management</router-link>
      </h1>
      <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
        <span class="visually-hidden">Toggle navigation</span
        ><span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcol-1">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="$store.state.isUserLoggedIn">
            <a class="nav-link disabled" href="#" target="_blank" rel="noopener noreferrer">{{ userAndBalance.user.email }}</a>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn">
            <span class="nav-link disabled">Balance: {{ userAndBalance.balance }} MYR</span>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn">
            <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
          </li>
          <li class="nav-item" v-if="!$store.state.isUserLoggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!$store.state.isUserLoggedIn">
            <router-link class="nav-link" to="/register">Sign Up</router-link>
          </li>
          <li class="nav-item" v-if="$store.state.isUserLoggedIn">
            <a class="nav-link" href="#" @click="logout({name: 'logout'})">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    userAndBalance () {
      // Retrieve the user data from the store's state
      return {
        user: this.$store.state.user,
        balance: this.$store.state.balance
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
}
</style>
