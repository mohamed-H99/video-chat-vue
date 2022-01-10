<template>
  <form @submit.prevent="$store.dispatch('login', formData)">
    <div class="form-group mb-2">
      <label for="email">Email address</label>
      <input type="email" id="email" name="email" class="form-control" v-model="formData.email" />
    </div>
    <div class="form-group mb-2">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" class="form-control" v-model="formData.password" />
    </div>
    <div class="form-group mt-3 d-flex justify-content-start align-items-center">
      <button type="submit" class="btn btn-danger">Login</button>
      <span class="ms-2 text-muted"> Don't have an account? <router-link to="/register">Register</router-link> </span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  destroyed() {
    this.formData = {
      username: '',
      email: '',
      password: '',
    };
  },
};
</script>
