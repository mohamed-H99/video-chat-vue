<template>
  <div>
    <!-- create modal -->
    <b-modal id="modal-create" v-b-tooltip title="Create new Group" hide-footer>
      <form @submit.prevent="create">
        <div class="form-group">
          <label for="name">Group name</label>
          <input id="name" type="text" v-model="group.name" class="form-control" placeholder="" />
        </div>
        <div class="form-group mt-3">
          <button type="submit" class="btn btn-danger me-2">Create</button>
          <button type="button" class="btn btn-light" @click="$bvModal.hide('modal-create')">Discard</button>
        </div>
      </form>
    </b-modal>
    <!-- join modal -->
    <b-modal id="modal-join" v-b-tooltip title="Join group by ID" hide-footer>
      <form @submit.prevent="join">
        <div class="form-group">
          <label for="id">Group-ID</label>
          <input id="id" type="text" v-model="group.id" class="form-control" placeholder="" />
        </div>
        <div class="form-group mt-3">
          <button type="submit" class="btn btn-danger me-2">Join</button>
          <button type="button" class="btn btn-light" @click="$bvModal.hide('modal-join')">Discard</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Modals',
  data() {
    return {
      searchValue: '',
      group: {
        name: '',
        id: '',
      },
    };
  },
  methods: {
    async create() {
      await this.$store.dispatch('createGroup', this.group);
      this.$bvModal.hide('modal-create');
    },
    async join() {
      await this.$store.dispatch('getGroup', this.group.id);
      this.$bvModal.hide('modal-join');
    },
  },
  destroyed() {
    this.group = {
      name: '',
      id: '',
    };
  },
};
</script>
