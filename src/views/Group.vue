<template>
  <section>
    <div class="container">
      <div class="row c-row">
        <div class="col-md-8">
          <header class="mb-3">
            <button v-if="!$store.state.isJoined" class="btn btn-dark" @click="join">Join</button>
            <button v-else class="btn btn-danger" @click="leave">Leave</button>
          </header>
          <vue-webrtc ref="webrtc" width="100%" :roomId="$route.params.groupID"></vue-webrtc>
        </div>
        <div class="col-md-4">
          <Sidebar />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from '@/components/Sidebar';

export default {
  name: 'Group',
  components: {
    Sidebar,
  },
  computed: {
    activeGroup() {
      return this.$store.state.activeGroup;
    },
  },
  methods: {
    join() {
      this.$refs.webrtc.join();
      this.$store.commit('setJoined', true);
    },
    leave() {
      this.$refs.webrtc.leave();
      this.$store.commit('setJoined', false);
    },
  },
};
</script>

<style>
.video-list {
  min-height: 350px;
}
.video-item {
  height: 100%;
  width: 100%;
  background: transparent;
}
.video-item video {
  height: 100%;
  width: 100%;
}
.c-row {
  row-gap: 2rem;
}
</style>
