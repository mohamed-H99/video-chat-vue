<template>
  <section>
    <div class="container">
      <div class="card card-form">
        <div class="card-header">
          <h1 class="fw-bold">Create account</h1>
        </div>
        <div class="card-body">
          <RegisterForm />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RegisterForm from '@/components/RegisterForm';

export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
};
</script>
