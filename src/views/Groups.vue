<template>
  <section>
    <div class="container">
      <GroupsHeader title="Latest Groups" />
      <b-list-group class="mt-4">
        <PuSkeleton v-if="$store.state.loading" :count="3" width="100%" height="68px"></PuSkeleton>
        <GroupItem v-else v-for="group in $store.state.filteredGroups" :key="group.id" :data="group" />
      </b-list-group>
    </div>
  </section>
</template>

<script>
import GroupsHeader from '@/components/GroupsHeader';
import GroupItem from '@/components/GroupItem';
import { db } from '@/db';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default {
  name: 'Groups',
  components: {
    GroupsHeader,
    GroupItem,
  },
  mounted() {
    this.activateDataTracker();
  },
  methods: {
    activateDataTracker() {
      this.$store.commit('setLoading', true);
      const q = query(collection(db, 'groups'));
      const unsub = onSnapshot(q, querySnapshot => {
        const groups = [];
        querySnapshot.forEach(doc => {
          const iAmHost = doc.data().hosts?.find(host => host.uid === this.$store.state.user.uid);
          let iAm = iAmHost;
          if (!iAm) iAm = doc.data().attendees?.find(att => att.uid === this.$store.state.user.uid);
          groups.push({
            id: doc.id,
            ...doc.data(),
            iAmHost: iAmHost ? true : false,
            iAmIn: iAm ? true : false,
            myStatus: iAm ? iAm.status : '',
          });
        });
        this.$store.dispatch('setGroups', groups);
        this.$store.commit('setFilteredGroups', groups);
        if (this.$route.params.groupID) this.$store.dispatch('getGroup', this.$route.params.groupID);
        this.$store.commit('setLoading', false);
      });
    },
  },
};
</script>

<style>
button.close {
  border: 0;
  background: transparent;
  font-size: 2rem;
  height: 2rem;
  line-height: 1;
}
</style>
