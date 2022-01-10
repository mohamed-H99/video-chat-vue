<template>
  <form @submit.prevent="$store.dispatch('register', formData)" class="d-flex flex-column gap-2">
    <b-form-group label="Username" label-for="username">
      <b-form-input type="text" id="username" name="username" class="form-control" v-model="formData.username" />
    </b-form-group>
    <b-form-group label="Email address" label-for="email">
      <b-form-input type="email" id="email" name="email" class="form-control" v-model="formData.email" />
    </b-form-group>
    <b-form-group label="Password" label-for="password">
      <b-form-input type="password" id="password" name="password" class="form-control" v-model="formData.password" />
    </b-form-group>
    <b-form-group class="mt-2 d-flex justify-content-start align-items-center">
      <b-button type="submit" variant="primary">Register</b-button>
      <span class="ms-2 text-muted"> Already have an account? <router-link to="/login">Login</router-link> </span>
    </b-form-group>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        username: '',
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
