<template>
  <div class="card border-1">
    <div class="card-body d-flex align-items-center justify-content-between">
      <figure class="mb-0 d-flex gap-2 align-items-center">
        <i class="fas fa-users me-2"></i>
        <router-link :to="`/groups/${data.id}`" class="mb-0">
          {{ data.name }}
        </router-link>
      </figure>
      <b-button-group>
        <button class="btn btn-light border" title="Copy group-ID" @click="$store.dispatch('copyToClipboard', data.id)">
          <i class="fas fa-copy"></i>
        </button>
        <button
          v-if="data.iAmIn"
          class="btn btn-light border"
          title="Leave group"
          @click="$store.dispatch('leaveGroup', data.id)"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <button
          v-if="data.iAmHost"
          @click="$store.dispatch('removeGroup', data.id)"
          class="btn btn-light border"
          title="Delete group"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupItem',
  props: {
    data: Object,
  },
};
</script>
