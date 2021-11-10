import { USER_ROLES } from '@dsp/business';
import { defineAsyncComponent } from 'vue';

const lazyDefaultLayout = defineAsyncComponent(() =>
  import('@/components/layouts/default-layout/index.vue')
);
const lazyFullPageLayout = defineAsyncComponent(() =>
  import('@/components/layouts/full-page-layout/index.vue')
);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      permissions: [USER_ROLES.USER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      permissions: [],
      layout: lazyFullPageLayout
    }
  },
  {
    path: '/admin/utilisateurs',
    name: 'AdminUsers',
    component: () => import('@/pages/admin/users/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/utilisateurs/:slug',
    name: 'AdminUserDetails',
    component: () => import('@/pages/admin/user-details/index.vue'),
    props: true,
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/annonces',
    name: 'AdminItems',
    component: () => import('@/pages/admin/items/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/annonces/:id',
    name: 'AdminItemDetails',
    props: true,
    component: () => import('@/pages/admin/item-details/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/commandes',
    name: 'AdminOrders',
    props: true,
    component: () => import('@/pages/admin/orders/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/commandes/:id',
    name: 'AdminOrdersDetails',
    props: true,
    component: () => import('@/pages/admin/order-details/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/contact',
    name: 'AdminContact',
    props: true,
    component: () => import('@/pages/admin/contact/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/contact/:id',
    name: 'AdminContactDetails',
    props: true,
    component: () => import('@/pages/admin/contact-details/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/email',
    name: 'AdminEmail',
    props: true,
    component: () => import('@/pages/admin/email/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/store',
    name: 'AdminStore',
    props: true,
    component: () => import('@/pages/admin/store/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  },
  {
    path: '/admin/voucher',
    name: 'AdminVoucher',
    props: true,
    component: () => import('@/pages/admin/voucher/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: lazyDefaultLayout
    }
  }
];
