export * from './order.enums';
export * from './item.enums';

export const USER_ROLES = {
  USER: 'ROLE_USER',
  ADMIN: 'ROLE_ADMIN',
  PROJECT_MANAGER: 'ROLE_PROJECT_MANAGER',
  EVENT_MANAGER: 'ROLE_EVENT_MANAGER',
  STORE: 'ROLE_STORE',
  DAF: 'ROLE_DAF'
};

export const USER_GENDERS = {
  MALE: 'M',
  FEMALE: 'F'
};

export const DELIVERY_MODES = {
  MONDIAL_RELAY: 'mondialrelay',
  COLISSIMO: 'colissimo',
  LAPOSTE_COLISSIMO: 'lapostecolissimo',
  LAPOSTE_LETTER: 'lapostecourriersuivi',
  LOCATION: 'locationdelivery',
  HAND: 'handdelivery',
  RELAIS_COLIS: 'relaiscolis',
  COCOLIS: 'cocolis'
};

export const REMUNERATION_NAMES = {
  CASH: 'CASH',
  GIFTCARD: 'GIFTCARD'
};

export const CONTACT_STATUSES = {
  PENDING: 'refused',
  DONE: 'online',
  NOT_DONE: 'pending'
};
