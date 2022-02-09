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
    id: 'admin',
    icon: 'chart',
    permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
    links: [
      {
        target: { name: 'AdminItems' },
        id: 'items',
        isEnabled: config => config.features.admin.items?.isEnabled
      },
      {
        target: { name: 'AdminUsers' },
        id: 'users',
        isEnabled: config => config.features.admin.users?.isEnabled
      },
      {
        target: { name: 'AdminOrders' },
        id: 'orders',
        isEnabled: config => config.features.admin.orders?.isEnabled
      },
      {
        target: { name: 'AdminContact' },
        id: 'contacts',
        isEnabled: config => config.features.admin.contacts?.isEnabled
      },
      {
        target: { name: 'AdminVoucher' },
        id: 'vouchers',
        isEnabled: config => config.features.admin.vouchers?.isEnabled
      },
      {
        target: { name: 'AdminLocation' },
        id: 'locations',
        isEnabled: config => config.features.admin.stores?.isEnabled
      },
      {
        target: { name: 'AdminEmail' },
        id: 'mails',
        isEnabled: config => config.features.admin.emails?.isEnabled
      },
      {
        target: { name: 'AdminEvent' },
        id: 'events',
        isEnabled: config => config.features.admin.events?.isEnabled
      }
    ]
  },
  {
    id: 'store',
    icon: 'store',
    permissions: [
      USER_ROLES.ADMIN,
      USER_ROLES.PROJECT_MANAGER,
      USER_ROLES.STORE
    ],
    links: [
      { target: '/', id: 'storeDeposit' },
      { target: '/', id: 'userSearch' },
      { target: '/', id: 'stocks' }
    ]
  },
  {
    id: 'eventStore',
    icon: 'handshake',
    permissions: [
      USER_ROLES.ADMIN,
      USER_ROLES.PROJECT_MANAGER,
      USER_ROLES.EVENT_MANAGER
    ],
    links: [
      { target: '/', id: 'eventDeposit' },
      { target: '/', id: 'eventSales' }
    ]
  },
  {
    id: 'settings',
    icon: 'settings',
    permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
    links: [
      {
        target: { name: 'SettingsAnnouncement' },
        id: 'announcements',
        isEnabled: config => config.features.settings.announcements.isEnabled
      },
      {
        target: { name: 'SettingsCarousel' },
        id: 'carousel',
        isEnabled: config => config.features.settings.carousel.isEnabled
      },
      {
        target: { name: 'SettingsHomeBlocks' },
        id: 'blocks',
        isEnabled: config => config.features.settings.homeBlocks.isEnabled
      }
    ]
  }
];

export const CONTACT_STATUS_COLORS = {
  [CONTACT_STATUSES.NOT_DONE]: 'var(--color-red-600)',
  [CONTACT_STATUSES.PENDING]: 'var(--color-orange-500)',
  [CONTACT_STATUSES.DONE]: 'var(--color-green-700)'
};
