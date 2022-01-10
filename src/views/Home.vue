<template>
  <section>
    <div class="container">
      <h1>
        Hello,
        <PuSkeleton width="200px" height="auto" class="text-primary" v-if="$store.state.user">
          {{ $store.state.user.displayName || $store.state.user.email }}
        </PuSkeleton>
        <span v-else>There</span>
      </h1>
      <!-- auth -->
      <template v-if="$store.state.user">
        <router-link to="/groups" class="btn btn-primary">Groups</router-link>
      </template>
      <!-- guest -->
      <template v-else>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
};
</script>
