import layouts from '@/layouts';
import { USER_ROLES } from '@dsp/business';

export default [
  {
    path: '/admin/utilisateurs',
    name: 'AdminUsers',
    component: () => import('@/pages/admin/users/list.vue'),
    meta: {
      // permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.users.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/utilisateurs/:slug',
    name: 'AdminUserDetails',
    component: () => import('@/pages/admin/users/detail.vue'),
    props: true,
    meta: {
      // permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.users.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/annonces',
    name: 'AdminItems',
    component: () => import('@/pages/admin/items/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.items.isEnabled,
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
      isEnabled: config => config.features.admin.items.isEnabled,
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
      isEnabled: config => config.features.admin.orders.isEnabled,
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
      isEnabled: config => config.features.admin.orders.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/contact',
    name: 'AdminContact',
    props: true,
    component: () => import('@/pages/admin/contacts/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.contacts.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/contact/:id',
    name: 'AdminContactDetails',
    props: true,
    component: () => import('@/pages/admin/contacts/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.contacts.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/email',
    name: 'AdminEmail',
    props: true,
    component: () => import('@/pages/admin/emails/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.emails.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/email/:id',
    name: 'AdminEmailDetails',
    props: true,
    component: () => import('@/pages/admin/emails/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.emails.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/magasins',
    name: 'AdminLocation',
    props: true,
    component: () => import('@/pages/admin/locations/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.stores.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/magasin/:id',
    name: 'AdminLocationDetails',
    props: true,
    component: () => import('@/pages/admin/locations/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.stores.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/bons-dachats',
    name: 'AdminVoucher',
    props: true,
    component: () => import('@/pages/admin/vouchers/index.vue'),
    meta: {
      permissions: [
        USER_ROLES.USER,
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_MANAGER
      ],
      isEnabled: config => config.features.admin.vouchers.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/evenements',
    name: 'AdminEvent',
    props: true,
    component: () => import('@/pages/admin/events/list.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.events.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/admin/evenements/:id',
    name: 'AdminEventDetails',
    props: true,
    component: () => import('@/pages/admin/events/detail.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.admin.events.isEnabled,
      layout: layouts.default
    }
  }
];
