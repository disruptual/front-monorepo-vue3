import { USER_ROLES } from '@dsp/business';
import layouts from '@/layouts';
import adminRoutes from './admin/routes';

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
  {
    path: '/parametres/message-annonce',
    name: 'SettingsAnnouncement',
    props: true,
    component: () => import('@/pages/settings/announcement.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      layout: layouts.default
    }
  },
  ...adminRoutes
];
