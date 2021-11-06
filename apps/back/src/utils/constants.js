import { USER_ROLES } from '@dsp/business';

export const CONTEXT_KEYS = {
  BREADCRUMB: 'breadcrumb',
  DATATABLE: 'dataTable'
};

export const USER_DETAILS_TABS = {
  INFOS: 'infos',
  ORDERS: 'orders',
  ITEMS: 'items'
};

export const EVENTS = {
  DATA_TABLE: {
    COLUMN_UPDATE: 'DataTableColumn:update'
  }
};

export const DATATABLE_COLUMN_TYPES = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE'
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
  }
};

export const ORDER_DETAILS_TABS = {
  INFOS: 'infos',
  ITEMS: 'items'
};

export const MENU = [
  {
    name: 'Administration',
    icon: 'chart',
    permissions: [USER_ROLES.ADMIN, USER_ROLES.PROJECT_MANAGER],
    links: [
      { target: { name: 'AdminItems' }, label: 'Annonces' },
      { target: { name: 'AdminUsers' }, label: 'Utilisateurs' },
      { target: { name: 'AdminOrders' }, label: 'Commandes' },
      { target: '/', label: 'Support client' },
      { target: '/', label: "Bons d'achat" },
      { target: '/', label: 'Magasins' },
      { target: '/', label: 'Mails' }
    ]
  },
  {
    name: 'Magasin',
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
  }
];
