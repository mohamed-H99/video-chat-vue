import Vue from 'vue';
import Vuex from 'vuex';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, collection, Timestamp, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../db';
import { BrowserStorage } from '../main';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    isJoined: false,
    groups: [],
    filteredGroups: [],
    activeGroup: {},
  },

  mutations: {
    setUser(state, newData) {
      state.user = newData;
    },
    setJoined(state, status) {
      state.isJoined = status;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setGroups(state, newData) {
      state.groups = newData;
    },
    setFilteredGroups(state, newData) {
      state.filteredGroups = newData;
    },
    setActiveGroup(state, newData) {
      state.activeGroup = newData;
    },
  },

  actions: {
    // login
    async login({ commit }, { email, password }) {
      commit('setLoading', true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        BrowserStorage.set('token', res.user.accessToken);
        commit('setUser', res.user);
        Vue.$toast.success('Logged in Successfully!');
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    // register
    async register({ commit }, { username, email, password }) {
      commit('setLoading', true);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        BrowserStorage.set('token', res.user.accessToken);
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        Vue.$toast.success('Account Created!');
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    // logout
    async logout({ commit }) {
      commit('setLoading', true);
      try {
        await auth.signOut();
        BrowserStorage.remove('token');
        commit('setUser', null);
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    // create group
    async createGroup({ commit, state }, { name }) {
      commit('setLoading', true);
      try {
        const { uid, displayName, email } = state.user;
        const groupsRef = collection(db, 'groups');
        await setDoc(doc(groupsRef), {
          name: name,
          host: {
            uid,
            displayName,
            email,
          },
          attendees: [],
          createdAt: Timestamp.fromDate(new Date()),
        });
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    // update groups
    setGroups({ commit }, newData) {
      commit('setGroups', newData);
    },
    // search groups
    searchGroups({ state, commit }, searchValue) {
      commit('setLoading', true);
      const filteredGroups = state.groups.filter(g => {
        if (!g.name) return;
        return g.name.toLowerCase().match(searchValue.toLowerCase());
      });
      commit('setFilteredGroups', filteredGroups);
      commit('setLoading', false);
    },
    // remove group
    async removeGroup({ commit }, groupID) {
      commit('setLoading', true);
      try {
        const groupRef = doc(db, 'groups', groupID);
        await deleteDoc(groupRef);
        Vue.$toast.success('Group removed successfully!');
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    // get group & add client if not host/attendee
    async getGroup({ state, commit, dispatch }, groupID) {
      commit('setLoading', true);
      try {
        const groupRef = doc(db, 'groups', groupID);
        const res = await getDoc(groupRef);
        if (!res.exists()) {
          router.push('/groups');
          return;
        }
        const iAmHost = state.user.uid === res.data().host.uid ? true : false;
        if (!iAmHost) await dispatch('addUserToGroup', res);
        commit('setActiveGroup', {
          ...res.data(),
          id: res.id,
          iAmHost,
        });
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    // leave group & if host remove group
    async leaveGroup({ state, commit, dispatch }, groupID) {
      commit('setLoading', true);
      try {
        const groupRef = doc(db, 'groups', groupID);
        const res = await getDoc(groupRef);
        if (!res.exists()) {
          router.push('/groups');
          return;
        }
        const iAmHost = state.user.uid === res.data().host.uid ? true : false;
        commit('setActiveGroup', {});
        if (iAmHost) await dispatch('removeGroup', groupID);
        else {
          const newAttendees = res.data().attendees.filter(att => att.uid !== state.user.uid);
          await updateDoc(groupRef, {
            attendees: [...newAttendees],
          });
        }
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    async addUserToGroup({ state, commit }, groupDoc) {
      commit('setLoading', true);
      try {
        const groupRef = doc(db, 'groups', groupDoc.id);
        const groupData = groupDoc.data();
        const iAmIn = groupData.attendees?.find(att => att.uid === state.user.uid);
        if (!iAmIn) {
          const { uid, displayName, email } = state.user;
          await updateDoc(groupRef, {
            attendees: [
              ...groupData.attendees,
              {
                uid,
                displayName,
                email,
                approved: false,
              },
            ],
          });
          Vue.$toast.success('User added to attendees!');
        }
      } catch (err) {
        console.log('add to active error');
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    copyToClipboard(context, txt) {
      if (!navigator) return;
      navigator.clipboard.writeText(txt);
      Vue.$toast('Copied');
    },
  },
});
