import { USER_ROLES, CONTACT_STATUSES } from '@dsp/business';

export const CONTEXT_KEYS = {
  BREADCRUMB: 'breadcrumb',
  DATATABLE: 'dataTable',
  CAROUSEL: 'carousel',
  GLOBAL_STATE: 'globalState'
};

export const EVENTS = {
  DATA_TABLE: {
    COLUMN_UPDATE: 'DataTableColumn:update'
  }
};

export const CAROUSEL_VIEW_MODES = {
  DESKTOP: 'slidesDesktop',
  MOBILE: 'slidesMobile'
};

export const CAROUSEL_CTA_ALIGNMENTS = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
};

export const CAROUSEL_FILE_MAX_SIZE = 1;

export const DATATABLE_COLUMN_TYPES = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE',
  ENUM: 'ENUM'
};

export const DATATABLE_HIGHLIGHT_OPERATORS = {
  [DATATABLE_COLUMN_TYPES.STRING]: {
    EQUALS: 'STRINGEQUALS',
    INCLUDES: 'INCLUDES',
    STARTS_WITH: 'STARTSWIDTH',
    ENDS_WITH: 'ENDSWITH'
  },
  [DATATABLE_COLUMN_TYPES.NUMBER]: {
    EQUALS: 'NUMBEREQUALS',
    GREATER_THAN: 'GREATER_THAN',
    LOWER_THAN: 'LOWER_THAN'
  },
  [DATATABLE_COLUMN_TYPES.BOOLEAN]: {
    TRUE: 'TRUE',
    FALSE: 'FALSE'
  },
  [DATATABLE_COLUMN_TYPES.DATE]: {
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
  },
  [DATATABLE_COLUMN_TYPES.ENUM]: {
    EQUALS: 'ENUMEQUALS'
  }
};

export const ORDER_DETAILS_TABS = {
  INFOS: 'infos',
  ITEMS: 'items',
  HISTORY: 'history'
};

export const USER_DETAILS_TABS = {
  INFOS: 'infos',
  ORDERS: 'orders',
  ITEMS: 'items',
  REVIEWS: 'reviews'
};

export const EVENT_DETAILS_TABS = {
  INFOS: 'infos',
  ITEMS_DIGITAL: 'items_digital',
  ITEMS_PHYSICAL: 'items_physical'
};

export const HOME_TABS = {
  RELEASE: 'release',
  DATA_STUDIO: 'data_studio'
};

export const MENU = [
  {
    name: 'Administration',
    id: 'admin',
    icon: 'chart',
    permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
    links: [
      {
        target: { name: 'AdminItems' },
        label: 'Annonces',
        isEnabled: config => config.features.admin.items?.isEnabled
      },
      {
        target: { name: 'AdminUsers' },
        label: 'Utilisateurs',
        isEnabled: config => config.features.admin.users?.isEnabled
      },
      {
        target: { name: 'AdminOrders' },
        label: 'Commandes',
        isEnabled: config => config.features.admin.orders?.isEnabled
      },
      {
        target: { name: 'AdminContact' },
        label: 'Support client',
        isEnabled: config => config.features.admin.contacts?.isEnabled
      },
      {
        target: { name: 'AdminVoucher' },
        label: "Bons d'achat",
        isEnabled: config => config.features.admin.vouchers?.isEnabled
      },
      {
        target: { name: 'AdminLocation' },
        label: 'Magasins',
        isEnabled: config => config.features.admin.stores?.isEnabled
      },
      {
        target: { name: 'AdminEmail' },
        label: 'Mails',
        isEnabled: config => config.features.admin.emails?.isEnabled
      },
      {
        target: { name: 'AdminEvent' },
        label: 'Évenements',
        isEnabled: config => config.features.admin.events?.isEnabled
      }
    ]
  },
  {
    name: 'Magasin',
    id: 'store',
    icon: 'store',
    permissions: [
      USER_ROLES.ADMIN,
      USER_ROLES.PROJECT_MANAGER,
      USER_ROLES.STORE
    ],
    links: [
      { target: '/', label: 'Dépôt / retrait' },
      { target: '/', label: 'Rechercher un utilisateur' },
      { target: '/', label: 'Gestion des stocks' }
    ]
  },
  {
    name: 'Evenements',
    id: 'eventStore',
    icon: 'handshake',
    permissions: [
      USER_ROLES.ADMIN,
      USER_ROLES.PROJECT_MANAGER,
      USER_ROLES.EVENT_MANAGER
    ],
    links: [
      { target: '/', label: 'Dépôt' },
      { target: '/', label: 'Vente' }
    ]
  },
  {
    name: 'Paramètres',
    id: 'settings',
    icon: 'settings',
    permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
    links: [
      {
        target: { name: 'SettingsAnnouncement' },
        label: 'Annonces',
        isEnabled: config => config.features.settings.announcements.isEnabled
      },
      {
        target: { name: 'SettingsCarousel' },
        label: 'Carrousel',
        isEnabled: config => config.features.settings.carousel.isEnabled
      }
    ]
  }
];

export const CONTACT_STATUS_COLORS = {
  [CONTACT_STATUSES.NOT_DONE]: 'var(--color-red-600)',
  [CONTACT_STATUSES.PENDING]: 'var(--color-orange-500)',
  [CONTACT_STATUSES.DONE]: 'var(--color-green-700)'
};
