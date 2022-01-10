<template>
  <main role="main" id="main" class="py-4">
    <div class="container mt-4 d-flex flex-column align-items-center">
      <ProfileCard />
    </div>
  </main>
</template>

<script>
import ProfileCard from '@/components/ProfileCard';

export default {
  name: 'Profile',
  components: {
    ProfileCard,
  },
};
</script>
