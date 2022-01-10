<template>
  <aside>
    <h4>Group info</h4>
    <ul class="list-unstyled list">
      <li>
        <div class="row">
          <div class="col-sm-3">Group-ID</div>
          <div class="col">
            <PuSkeleton width="200px" height="20px">{{ groupInfo.id }}</PuSkeleton>
          </div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-sm-3">Name</div>
          <div class="col">
            <PuSkeleton width="100px" height="20px">{{ groupInfo.name }}</PuSkeleton>
          </div>
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-sm-3">Host/s</div>
          <div class="col">
            <PuSkeleton v-if="!groupInfo.hosts" width="150px" height="20px"></PuSkeleton>
            <span v-else class="badge bg-danger" v-for="host in groupInfo.hosts" :key="host.uid">
              {{ host.displayName || host.email }}
            </span>
          </div>
        </div>
      </li>
      <hr />
      <li>
        <PuSkeleton v-if="$store.state.loading" height="24px" width="100%"></PuSkeleton>
        <PuSkeleton
          v-if="$store.state.loading"
          class="d-block mt-2"
          height="42px"
          width="100%"
          :count="5"
        ></PuSkeleton>
        <div v-else class="row">
          <div class="col-sm-12 d-flex justify-content-between align-items-center">
            <strong>Attendee/s</strong>
            <span class="badge bg-dark">{{ groupInfo.attendees && groupInfo.attendees.length + 1 }}</span>
          </div>
          <div class="col">
            <AttendeesList />
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
import AttendeesList from '@/components/AttendeesList';

export default {
  name: 'Sidebar',
  components: {
    AttendeesList,
  },
  computed: {
    groupInfo() {
      return this.$store.state.activeGroup;
    },
  },
  mounted() {
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
.group-btn {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
}
</style>
