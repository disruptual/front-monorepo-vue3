import layouts from '@/layouts';
import { USER_ROLES } from '@dsp/business';

export default [
  {
    path: '/parametres/message-annonce',
    name: 'SettingsAnnouncement',
    props: true,
    component: () => import('@/pages/settings/announcement.vue'),
    meta: {
      permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.settings.announcements.isEnabled,

      layout: layouts.default
    }
  },
  {
    path: '/parametres/carousel',
    name: 'SettingsCarousel',
    props: true,
    component: () => import('@/pages/settings/carousel.vue'),
    meta: {
      permissions: [USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.settings.carousel.isEnabled,
      layout: layouts.default
    }
  },
  {
    path: '/parametres/home-blocks',
    name: 'SettingsHomeBlocks',
    props: true,
    component: () => import('@/pages/settings/home-blocks.vue'),
    meta: {
      permissions: [USER_ROLES.PROJECT_MANAGER],
      isEnabled: config => config.features.settings.homeBlocks.isEnabled,
      layout: layouts.default
    }
  }
];
