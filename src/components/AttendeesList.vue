<template>
  <b-list-group class="mt-3">
    <b-list-group-item
      v-for="att in groupInfo.attendees"
      :key="att.uid"
      class="p-2 d-flex justify-content-between align-items-center"
    >
      <span>{{ att.displayName || att.email }}</span>
      <!-- host actions -->
      <b-button-group v-if="groupInfo.iAmHost">
        <b-button
          v-if="att.status === 'approved' && !att.isHost"
          @click="
            $store.dispatch('setUserStatus', {
              groupID: groupInfo.id,
              uid: att.uid,
              status: 'pending',
            })
          "
          class="group-btn"
          variant="danger"
        >
          <i class="fas fa-times"></i>
        </b-button>
        <b-button
          v-else-if="!att.isHost"
          @click="
            $store.dispatch('setUserStatus', {
              groupID: groupInfo.id,
              uid: att.uid,
              status: 'approved',
            })
          "
          class="group-btn"
          variant="dark"
        >
          <i class="fas fa-check"></i>
        </b-button>
      </b-button-group>
      <!-- status -->
      <div>
        <span v-if="att.isHost" class="badge bg-dark"> Host </span>
        <span
          v-else
          :class="{
            'badge bg-warning': att.status === 'pending',
            'badge bg-success': att.status === 'approved',
          }"
          >{{ att.status }}</span
        >
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: 'AttendeesList',
  computed: {
    groupInfo() {
      return this.$store.state.activeGroup;
    },
  },
};
</script>
