<template>
  <div class="card card-profile rounded-0">
    <div class="card-body p-4 pt-0">
      <figure class="d-flex mb-0 justify-content-center">
        <PuSkeleton v-if="$store.state.loading" width="110px" circle height="110px" class="avatar"></PuSkeleton>
        <img
          v-else
          width="110"
          height="110"
          class="avatar shadow"
          :src="user.photoURL || 'https://loremflickr.com/110/110'"
          :alt="user.displayName || user.email"
        />
      </figure>
      <div class="card-content">
        <PuSkeleton v-if="$store.state.loading" width="100%" class="h1 d-block text-center"></PuSkeleton>
        <h1 v-else class="h1 text-center">{{ user.displayName || user.email }}</h1>

        <PuSkeleton v-if="$store.state.loading" class="mb-1" height="24px" :count="2"></PuSkeleton>
        <ul v-else class="list-unstyled mb-0 pt-1 d-flex flex-column gap-1">
          <li class="row">
            <div class="col-sm-3 d-flex align-items-center">
              <span class="badge bg-dark w-100">Uid</span>
            </div>
            <div class="col">{{ user.uid }}</div>
          </li>
          <li class="row">
            <div class="col-sm-3 d-flex align-items-center">
              <span class="badge bg-dark w-100">Email</span>
            </div>
            <div class="col">{{ user.email }}</div>
          </li>
          <li class="row">
            <div class="col-sm-3 d-flex align-items-center">
              <span class="badge bg-dark w-100">Joined</span>
            </div>
            <div class="col">{{ new Date(user.metadata.creationTime) | date }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { createDateFilter } from 'vue-date-fns';

export default {
  name: 'Profile',
  filters: {
    date: createDateFilter('MMM d, yyyy'),
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
.card-profile {
  width: 95%;
  max-width: 480px;
}
.card-profile figure {
  position: relative;
  z-index: 1;
}
.card-profile figure::after {
  position: absolute;
  z-index: -1;
  content: '';
  top: 0;
  left: 50%;
  transform: translate(-50%, -40%) rotateZ(60deg);
  background-color: var(--bs-danger);
  width: 80px;
  height: 140px;
  border-radius: 1.5rem;
}
.avatar {
  transform: translateY(-40%);
  width: 110px;
  min-width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 9999px;
  margin: 0;
  padding: 0;
  display: block;
}
.card-content {
  margin-top: -1.5rem;
}
</style>
