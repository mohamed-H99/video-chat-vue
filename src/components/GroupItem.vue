<template>
  <b-list-group-item class="ps-2">
    <div class="d-flex align-items-center justify-content-between">
      <figure class="mb-0 d-flex gap-2 align-items-center">
        <router-link :to="`/groups/${data.id}`" class="mb-0">
          <img
            class="me-2 c-rounded"
            width="50"
            height="50"
            :src="data.photoURL || 'https://loremflickr.com/110/110'"
            :alt="data.name"
          />
          <span>{{ data.name }}</span>
        </router-link>
      </figure>
      <b-button-group>
        <button
          class="btn btn-light border"
          v-b-tooltip
          title="Copy group-ID"
          @click="$store.dispatch('copyToClipboard', data.id)"
        >
          <i class="fas fa-copy"></i>
        </button>
        <button
          v-if="data.iAmIn && !data.iAmHost"
          class="btn btn-light border"
          v-b-tooltip
          title="Leave group"
          @click="$store.dispatch('leaveGroup', data.id)"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <button
          v-if="data.iAmHost"
          @click="$store.dispatch('removeGroup', data.id)"
          class="btn btn-light border"
          v-b-tooltip
          title="Delete group"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </b-button-group>
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  name: 'GroupItem',
  props: {
    data: Object,
  },
};
</script>
