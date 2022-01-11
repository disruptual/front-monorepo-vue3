import layouts from '@/layouts';
import { USER_ROLES } from '@dsp/business';

export default [
  {
    path: '/admin/utilisateurs',
    name: 'AdminUsers',
    component: () => import('@/pages/admin/users/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/utilisateurs/:slug',
    name: 'AdminUserDetails',
    component: () => import('@/pages/admin/users/detail.vue'),
    props: true,
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/annonces',
    name: 'AdminItems',
    component: () => import('@/pages/admin/items/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/annonces/:id',
    name: 'AdminItemDetails',
    props: true,
    component: () => import('@/pages/admin/items/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/commandes',
    name: 'AdminOrders',
    props: true,
    component: () => import('@/pages/admin/orders/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/commandes/:id',
    name: 'AdminOrderDetails',
    props: true,
    component: () => import('@/pages/admin/orders/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/contact',
    name: 'AdminContact',
    props: true,
    component: () => import('@/pages/admin/contact/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/contact/:id',
    name: 'AdminContactDetails',
    props: true,
    component: () => import('@/pages/admin/contact/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/email',
    name: 'AdminEmail',
    props: true,
    component: () => import('@/pages/admin/email/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
    {
    path: '/admin/email/:id',
    name: 'AdminEmailDetails',
    props: true,
    component: () => import('@/pages/admin/email/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/magasins',
    name: 'AdminStore',
    props: true,
    component: () => import('@/pages/admin/store/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/bons-dachats',
    name: 'AdminVoucher',
    props: true,
    component: () => import('@/pages/admin/voucher/index.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/evenements',
    name: 'AdminEvent',
    props: true,
    component: () => import('@/pages/admin/event/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/admin/evenements/:id',
    name: 'AdminEventDetails',
    props: true,
    component: () => import('@/pages/admin/event/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  }
];
