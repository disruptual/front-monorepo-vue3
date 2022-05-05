import { USER_ROLES } from '@dsp/business';
import { defineAsyncComponent } from 'vue';

const lazyDefaultLayout = defineAsyncComponent(() =>
  import('@/components/layouts/default-layout/index.vue')
);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      permissions: [],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/inscription',
    name: 'SignUp',
    component: () => import('@/pages/sign-up/index.vue'),
    meta: {
      permissions: [],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/profil/:slug?',
    name: 'Profile',
    component: () => import('@/pages/profile/index.vue'),
    meta: {
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/messagerie',
    name: 'Inbox',
    component: () => import('@/pages/inbox/index.vue'),
    meta: {
      permissions: [USER_ROLES.USER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/panier',
    name: 'Cart',
    component: () => import('@/pages/cart/index.vue'),
    meta: {
      permissions: [USER_ROLES.USER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/search/:category?',
    name: 'ItemSearch',
    component: () => import('@/pages/item-search/index.vue'),
    props: true,
    meta: {
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/article/:slug',
    name: 'ItemDetails',
    component: () => import('@/pages/item-details/index.vue'),
    props: true,
    meta: {
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/vendre/:itemId?',
    name: 'ItemCreation',
    component: () => import('@/pages/item-creation/index.vue'),
    props: true,
    meta: {
      permissions: [USER_ROLES.USER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/pages/notifications/index.vue'),
    meta: {
      permissions: [USER_ROLES.USER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/cms/:slug',
    name: 'Cms',
    component: () => import('@/pages/cms/index.vue'),
    props: true,
    meta: {
      layout: lazyDefaultLayout
    }
  }
];
