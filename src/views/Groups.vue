<template>
  <section class="about">
    <div class="container">
      <GroupsHeader title="Latest Groups" />
      <div class="mt-4 d-flex flex-column gap-1">
        <PuSkeleton v-if="$store.state.loading" :count="2" width="100%" height="70px"></PuSkeleton>
        <GroupItem v-else v-for="group in $store.state.filteredGroups" :key="group.id" :data="group" />
      </div>
    </div>
  </section>
</template>

<script>
import GroupsHeader from '@/components/GroupsHeader'
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
