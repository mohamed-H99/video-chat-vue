<template>
  <div id="app">
    <Navbar />
    <main role="main" id="main" class="py-4">
      <router-view />
    </main>
    <Footer />
    <Modals />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Modals from '@/components/Modals';
import { BrowserStorage } from '@/main';
import { auth } from '@/db';

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer,
    Modals,
  },
  mounted() {
    const accessToken = BrowserStorage.get('token');
    if (accessToken) {
      this.$store.commit('setUser', {
        accessToken,
      });
      // this.activateDataTracker();
    }
    this.activateAuthTracker();
  },
  methods: {
    activateAuthTracker() {
      auth.onAuthStateChanged(cred => {
        this.$store.commit('setUser', cred);
        const routeName = this.$router.currentRoute.name;
        if (cred) {
          BrowserStorage.set('token', cred.accessToken);
          if (routeName === 'Login' || routeName === 'Register') this.$router.push('/');
        } else {
          BrowserStorage.remove('token');
          if (!['Home', 'Login', 'Register'].includes(routeName)) this.$router.push('/');
        }
        this.$store.commit('setLoading', false);
      });
    },
    // activateDataTracker() {
    //   this.$store.commit('setLoading', true);
    //   const q = query(collection(db, 'groups'));
    //   const unsub = onSnapshot(q, querySnapshot => {
    //     const groups = [];
    //     querySnapshot.forEach(doc => {
    //       const iAmHost = doc.data().hosts?.find(host => host.uid === this.$store.state.user.uid);
    //       let iAm = iAmHost;
    //       if (!iAm) iAm = doc.data().attendees?.find(att => att.uid === this.$store.state.user.uid);
    //       groups.push({
    //         id: doc.id,
    //         ...doc.data(),
    //         iAmHost: iAmHost ? true : false,
    //         iAmIn: iAm ? true : false,
    //         myStatus: iAm ? iAm.status : '',
    //       });
    //     });
    //     this.$store.dispatch('setGroups', groups);
    //     this.$store.commit('setFilteredGroups', groups);
    //     if (this.$route.params.groupID) this.$store.dispatch('getGroup', this.$route.params.groupID);
    //     this.$store.commit('setLoading', false);
    //   });
    // },
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

:root {
  --bs-black: #000000;
}

body {
  font-family: 'Poppins', sans-serif;
}
#app {
  min-height: 100vh;
}
#main {
  min-height: calc(100vh - 56px - 40px);
  /* background-color: var(--bs-black);
  color: var(--bs-white); */
}
.card-form {
  max-width: 400px;
  margin-inline: auto;
}
hr {
  margin: 0.5rem 0;
}
.btn,
.form-control,
.badge,
.list-group-item,
.card,
.c-rounded {
  border-radius: 0 !important;
}
</style>
