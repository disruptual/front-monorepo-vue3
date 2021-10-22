import { USER_ROLES } from '@dsp/business';
import { USER_DETAILS_TABS } from '@/utils/constants';

export default {
  user: {
    roles: {
      [USER_ROLES.USER]: 'Utilisateur',
      [USER_ROLES.ADMIN]: 'Administrateur',
      [USER_ROLES.PROJECT_MANAGER]: 'Chef de projet',
      [USER_ROLES.STORE]: 'Magasin',
      [USER_ROLES.DAF]: 'DAF',
      [USER_ROLES.EVENT_MANAGER]: 'Magasin évènement'
    },

    details: {
      tabs: {
        [USER_DETAILS_TABS.INFOS]: 'Informations',
        [USER_DETAILS_TABS.ITEMS]: 'Articles',
        [USER_DETAILS_TABS.ORDERS]: 'Commandes'
      }
    }
  }
};
