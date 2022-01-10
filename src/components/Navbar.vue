<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand fw-bold" aria-current="page" aria-label="logo" to="/">VideoChat</router-link>
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
        <ul class="navbar-nav d-flex gap-1">
          <!-- auth -->
          <template v-if="user">
            <li class="nav-item">
              <router-link class="btn btn-primary" to="/groups">Groups</router-link>
            </li>
            <li>
              <router-link class="btn btn-light" v-b-tooltip title="Profile" to="/profile">
                <i class="far fa-user"></i>
              </router-link>
            </li>
            <li>
              <button class="btn btn-light" v-b-tooltip title="Logout" @click.prevent="logout">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </li>
          </template>
          <!-- guest -->
          <template v-else>
            <li class="nav-item">
              <router-link class="btn btn-primary" to="/login">Login</router-link>
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
  name: 'Navbar',
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>
