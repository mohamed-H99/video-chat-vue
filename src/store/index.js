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
        const cred = await signInWithEmailAndPassword(auth, email, password);
        BrowserStorage.set('token', cred.user.accessToken);
        commit('setUser', cred.user);
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
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        BrowserStorage.set('token', cred.user.accessToken);
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
          hosts: [
            {
              uid,
              displayName,
              email,
            },
          ],
          attendees: [
            {
              uid,
              displayName,
              email,
              status: 'approved',
              isHost: true,
            },
          ],
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
    async removeGroup({ state, commit }, groupID) {
      commit('setLoading', true);
      try {
        const groupRef = doc(db, 'groups', groupID);
        const groupDoc = await getDoc(groupRef);
        if (!groupDoc.exists()) return Vue.$toast.error('Group is not exist');
        const iAmHost = groupDoc.data().hosts.find(host => host.uid === state.user.uid);
        if (!iAmHost) return Vue.$toast.error('Permission denied');
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
        const groupDoc = await getDoc(groupRef);
        if (!groupDoc.exists()) {
          Vue.$toast.error('Group is not found');
          return router.push('/');
        }
        const iAmHost = groupDoc.data().hosts.find(host => host.uid === state.user.uid);
        if (!iAmHost) return dispatch('addUserToGroup', groupDoc);
        commit('setActiveGroup', {
          ...groupDoc.data(),
          id: groupDoc.id,
          iAmHost: iAmHost ? true : false,
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
        const groupDoc = await getDoc(groupRef);
        if (!groupDoc.exists()) return router.push('/groups');
        const iAmHost = groupDoc.data().hosts.find(host => host.uid === state.user.uid);
        commit('setActiveGroup', {});
        if (iAmHost) return dispatch('removeGroup', groupID);
        const newAttendees = groupDoc.data().attendees.filter(att => att.uid !== state.user.uid);
        await updateDoc(groupRef, {
          attendees: [...newAttendees],
        });
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
        const iAmIn = groupDoc.data().attendees?.find(att => att.uid === state.user.uid);
        if (iAmIn) return Vue.$toast.error('User already exists');
        const { uid, displayName, email } = state.user;
        await updateDoc(groupRef, {
          attendees: [
            ...groupDoc.data().attendees,
            {
              uid,
              displayName,
              email,
              status: 'pending',
              // isHost: false,
            },
          ],
        });
        commit('setActiveGroup', {
          ...groupDoc.data(),
          id: groupDoc.id,
          iAmHost: iAmHost ? true : false,
        });
        Vue.$toast.success('User added to Group');
        this.dispatch('getGroup', groupDoc.id);
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    // change user status
    async setUserStatus({ state, commit }, { groupID, uid, status }) {
      commit('setLoading', true);
      try {
        const groupRef = doc(db, 'groups', groupID);
        const groupDoc = await getDoc(groupRef);
        if (!groupDoc.exists()) return Vue.$toast.error('Group is not exist!');
        if (groupDoc.data().host.uid !== state.user.uid) return Vue.$toast.error('Permission denied');
        const newAttendees = groupDoc.data().attendees.map(att => {
          if (att.uid === uid) att.status = status;
          return att;
        });
        await updateDoc(groupRef, {
          attendees: [...newAttendees],
        });
        Vue.$toast.success("User's status changed");
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit('setLoading', false);
      }
    },
    copyToClipboard(context, txt) {
      if (!navigator) return;
      navigator.clipboard.writeText(txt);
      Vue.$toast.success('Copied');
    },
  },
});
