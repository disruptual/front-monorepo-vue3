import { USER_ROLES } from '@dsp/business';
import layouts from '@/layouts';
import adminRoutes from './admin/routes';
import settingsRoutes from './settings/routes';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      permissions: [USER_ROLES.USER],
      layout: layouts.default
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      permissions: [],
      layout: layouts.fullPage
    }
  },
  ...settingsRoutes,
  ...adminRoutes
];
