<template>
  <section>
    <div class="container">
      <div class="card card-form">
        <div class="card-header">
          <h1 class="fw-bold">Login</h1>
        </div>
        <div class="card-body">
          <LoginForm />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
};
</script>
