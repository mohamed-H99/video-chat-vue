import './db';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import WebRTC from 'vue-webrtc';
import { BootstrapVue } from 'bootstrap-vue';
import Toast from 'vue-toastification';
import Skeleton from 'vue-loading-skeleton';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export const BrowserStorage = {
  set(key, newVal) {
    return localStorage?.setItem(key, JSON.stringify(newVal));
  },
  remove(key) {
    return localStorage?.removeItem(key);
  },
  get(key) {
    return JSON.parse(localStorage?.getItem(key) || 'null');
  },
};

Vue.config.productionTip = false;

Vue.use(WebRTC);
Vue.use(Toast, {
  // options
});
Vue.use(BootstrapVue);
Vue.use(Skeleton);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
