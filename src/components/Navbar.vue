<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-danger">
    <div class="container">
      <router-link class="navbar-brand fw-bold" aria-current="page" to="/">VideoChat</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <!-- auth -->
          <template v-if="$store.state.user">
            <li class="nav-item">
              <router-link class="btn btn-danger" to="/groups">Groups</router-link>
            </li>
            <li class="nav-item ms-2">
              <a href="#" class="btn btn-light" @click.prevent="logout" title="logout">
                Logout <i class="fas fa-sign-out-alt ms-1"></i
              ></a>
            </li>
          </template>
          <!-- guest -->
          <template v-else>
            <li class="nav-item">
              <router-link class="btn btn-danger" to="/login">Login</router-link>
            </li>
            <li class="nav-item ms-2">
              <router-link class="btn btn-light" to="/register">Join Us</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>
