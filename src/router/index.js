import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Error from '../views/Error.vue';
import { BrowserStorage } from '../main';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('../views/Groups.vue'),
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: '/groups/:groupID',
    name: 'Group',
    component: () => import('../views/Group.vue'),
    meta: {
      allowAnonymous: false,
    },
  },
  {
    path: '*',
    name: 'Error',
    component: Error,
    meta: {
      allowAnonymous: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnonymous && !BrowserStorage.get('token')) {
    console.log('redirect');
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else next();
});

export default router;
