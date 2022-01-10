<template>
  <section>
    <div class="container mt-5 d-flex flex-column align-items-center">
      <ProfileCard />
    </div>
  </section>
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
