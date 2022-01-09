<template>
  <header class="row gap-3 gap-sm-0">
    <div class="col-sm-6 d-flex justify-content-center justify-content-sm-start align-items-center">
      <h1 class="h3 mb-0">{{ title }}</h1>
    </div>
    <div class="col-sm-6 d-flex gap-2">
      <input
        type="search"
        placeholder="Search.."
        @input="e => $store.dispatch('searchGroups', e.target.value)"
        class="form-control"
      />
      <button class="btn btn-danger" title="Create group" v-b-modal="'modal-create'">Create</button>
      <button class="btn btn-dark" title="Join group by ID" v-b-modal="'modal-join'">Join</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'GroupsHeader',
  props: {
    title: String,
  },
};
</script>
