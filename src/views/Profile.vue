<template>
  <section class="mt-5">
    <div class="container d-flex flex-column align-items-center">
      <div class="card card-profile shadow rounded-lg">
        <div class="card-body p-4 pt-0">
          <figure class="d-flex mb-0 justify-content-center">
            <PuSkeleton
              v-if="$store.state.loading"
              width="110px"
              circle
              height="110px"
              class="avatar rounded-circle border-3 border-primary border-dashed d-block"
            ></PuSkeleton>
            <img
              v-else
              width="110"
              height="110"
              class="avatar rounded-circle border-3 border-primary border-dashed d-block"
              :src="user.photoURL || 'https://via.placeholder.com/64'"
              :alt="user.displayName || user.email"
            />
          </figure>
          <div class="card-content">
            <PuSkeleton width="100%" class="h1 d-block mb-3 text-center">{{
              user.displayName || user.email
            }}</PuSkeleton>
            <PuSkeleton v-if="$store.state.loading" class="mb-1" height="24px" :count="2"></PuSkeleton>
            <ul v-else class="list-unstyled mb-2">
              <li class="row">
                <div class="col-sm-2">ID</div>
                <div class="col">{{ user.uid }}</div>
              </li>
              <li class="row">
                <div class="col-sm-2">Email</div>
                <div class="col">{{ user.email }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
.card-profile {
  width: 90%;
  max-width: 480px;
}
.avatar {
  transform: translateY(-50%);
}
</style>
