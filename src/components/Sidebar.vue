<template>
  <aside>
    <h4>Group info</h4>
    <ul class="list-unstyled list">
      <li>
        <div class="row">
          <div class="col-sm-2">ID</div>
          <div class="col">
            <PuSkeleton width="200px" height="20px">{{ groupInfo.id }}</PuSkeleton>
          </div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-sm-2">Name</div>
          <div class="col">
            <PuSkeleton width="100px" height="20px">{{ groupInfo.name }}</PuSkeleton>
          </div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-sm-2">Host</div>
          <div class="col">
            <PuSkeleton width="150px" height="20px">
              {{ groupInfo.host && groupInfo.host.displayName }}
            </PuSkeleton>
          </div>
        </div>
      </li>
      <hr />
      <li>
        <PuSkeleton v-if="$store.state.loading" height="20px" width="100%"></PuSkeleton>
        <PuSkeleton v-if="$store.state.loading" height="20px" width="150px" :count="3"></PuSkeleton>
        <div v-else class="row">
          <div class="col-sm-12 d-flex justify-content-between align-items-center">
            <strong>Attendee/s</strong>
            <span class="badge bg-dark">{{ groupInfo.attendees && groupInfo.attendees.length }}</span>
          </div>
          <div class="col items">
            <span
              class="badge bg-dark"
              v-for="(att, idx) in groupInfo.attendees"
              :key="att.uid || idx"
              :class="{ 'bg-danger': att.isHost }"
            >
              {{ att.displayName }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  computed: {
    groupInfo() {
      return this.$store.state.activeGroup;
    },
  },
  created() {
    this.$store.dispatch('getGroup', this.$route.params.groupID);
  },
};
</script>

<style>
.list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.items {
  margin-top: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
</style>
