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
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/profile/index.vue'),
    meta: {
      permissions: [USER_ROLES.USER],
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
    path: '/search/:categoryId?',
    name: 'ItemSearch',
    component: () => import('@/pages/item-search/index.vue'),
    meta: {
      layout: lazyDefaultLayout
    }
  }
];
