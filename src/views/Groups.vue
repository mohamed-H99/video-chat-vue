<template>
  <main role="main" id="main" class="py-4">
    <div class="container">
      <GroupsHeader title="Latest Groups" />
      <b-list-group class="mt-4">
        <PuSkeleton v-if="$store.state.loading" :count="3" width="100%" height="68px"></PuSkeleton>
        <GroupItem v-else v-for="group in $store.state.filteredGroups" :key="group.id" :data="group" />
      </b-list-group>
    </div>
  </main>
</template>

<script>
import GroupsHeader from '@/components/GroupsHeader';
import GroupItem from '@/components/GroupItem';

export default {
  name: 'Groups',
  components: {
    GroupsHeader,
    GroupItem,
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
