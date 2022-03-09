import layouts from '@/layouts';
import { USER_ROLES } from '@dsp/business';

export default [
  {
    path: '/store/commandes',
    name: 'StoreOrders',
    props: true,
    component: () => import('@/pages/store/order/search.vue'),
    meta: {
      permissions: [USER_ROLES.STORE, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  {
    path: '/store/commandes/:id',
    name: 'StoreOrderDetail',
    props: true,
    component: () => import('@/pages/store/order/details.vue'),
    meta: {
      permissions: [USER_ROLES.STORE, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  }
];
