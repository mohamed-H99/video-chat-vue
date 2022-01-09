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
import { BrowserStorage } from './main';
import { auth, db } from './db';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';

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
    }
    // listening to auth changes
    auth.onAuthStateChanged(cred => {
      this.$store.commit('setUser', cred);
      const routeName = this.$router.currentRoute.name;
      if (cred) {
        BrowserStorage.set('token', cred.accessToken);
        if (routeName === 'Login' || routeName === 'Register') {
          this.$router.push('/');
        }
      } else {
        BrowserStorage.remove('token');
        if (routeName !== 'Home') {
          this.$router.push('/');
        }
      }
    });
    // listening to real-time data changes
    this.$store.commit('setLoading', true);
    const q = query(collection(db, 'groups'));
    const unsub = onSnapshot(q, querySnapshot => {
      const groups = [];
      querySnapshot.forEach(doc => {
        const iAmHost = this.$store.state.user.uid === doc.data().host.uid ? true : false;
        let iAmIn = false;
        if (iAmHost) iAmIn = true;
        else iAmIn = doc.data().attendees?.find(att => att.uid === this.$store.state.user.uid) ? true : false;
        groups.push({
          id: doc.id,
          ...doc.data(),
          iAmHost,
          iAmIn,
        });
      });
      this.$store.dispatch('setGroups', groups);
      this.$store.commit('setFilteredGroups', groups);
      this.$store.commit('setLoading', false);
    });
  },
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

#main {
  min-height: calc(100vh - 56px * 2);
}
.card-form {
  max-width: 400px;
  margin-inline: auto;
}
hr {
  margin: 0.5rem 0;
}
</style>
