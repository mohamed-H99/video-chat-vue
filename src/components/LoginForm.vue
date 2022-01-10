<template>
  <b-form @submit.prevent="$store.dispatch('login', formData)" class="d-flex flex-column gap-2">
    <b-form-group label="Email address" label-for="email">
      <b-form-input type="email" id="email" name="email" v-model="formData.email" />
    </b-form-group>
    <b-form-group label="Password" label-for="password">
      <b-form-input type="password" id="password" name="password" v-model="formData.password" />
    </b-form-group>
    <b-form-group class="mt-2 d-flex justify-content-start align-items-center">
      <b-button variant="primary" type="submit">Login</b-button>
      <span class="ms-2 text-muted"> Don't have an account? <router-link to="/register">Register</router-link> </span>
    </b-form-group>
  </b-form>
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
