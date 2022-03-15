import { TIME_IN_HOURS } from '@dsp/business/utils/constants';

const { ONE_DAY, ONE_WEEK } = TIME_IN_HOURS;

export const ORDER_STATES = {
  DELIVERED: 'DELIVERED',
  DISTRIBUTED: 'DISTRIBUTED',
  END: 'END',
  ORDERED: 'ORDERED',
  ORDER_ACCEPTED: 'ORDER_ACCEPTED',
  DELIVERY_IN_PROGRESS: 'DELIVERY_IN_PROGRESS',
  SENT: 'SENT',
  STORE_TO_STORE_VALIDATED: 'STORE_TO_STORE_VALIDATED'
};

export const ORDER_STATE_TRANSITIONS = {
  ORDERED: 'ORDERED',
  ORDER_ACCEPTED_BY_SELLER: 'ORDER_ACCEPTED_BY_SELLER',
  BUYER_IN_STORE_ACCEPT: 'BUYER_IN_STORE_ACCEPT',
  BUYER_IN_STORE_REFUSE: 'BUYER_IN_STORE_REFUSE',
  CANCEL: 'CANCEL',
  CANCEL_AUTOMATIC: 'CANCEL_AUTOMATIC',
  CANCEL_AUTOMATIC_BY_DISTRIBUTED: 'CANCEL_AUTOMATIC_BY_DISTRIBUTED',
  CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED: 'CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED',
  DELIVERY: 'DELIVERY',
  DELIVERY_BY_ORDER_ACCEPTED: 'DELIVERY_BY_ORDER_ACCEPTED',
  DELIVERY_BY_SENT: 'DELIVERY_BY_SENT',
  DELIVERY_CANCELLED: 'DELIVERY_CANCELLED',
  DELIVERY_COMPLETED: 'DELIVERY_COMPLETED',
  DISTRIBUTION_BY_ORDER_ACCEPTED: 'DISTRIBUTION_BY_ORDER_ACCEPTED',
  DISTRIBUTION_BY_SENT: 'DISTRIBUTION_BY_SENT',
  LOST_PACKAGE: 'LOST_PACKAGE',
  ORDER_ACCEPTANCE: 'ORDER_ACCEPTANCE',
  SELLER_RECOVERY: 'SELLER_RECOVERY',
  SEND: 'SEND',
  STORE_ACCEPT: 'STORE_ACCEPT',
  STORE_TO_STORE_ACCEPT: 'STORE_TO_STORE_ACCEPT',
  STORE_LOSE_PACKAGE: 'STORE_LOSE_PACKAGE',
  STORE_TO_STORE_LOST_PACKAGE_BEFORE_TRANSIT:
    'STORE_TO_STORE_LOST_PACKAGE_BEFORE_TRANSIT',
  STORE_REFUSE: 'STORE_REFUSE',
  TO_GIVE_TO_AN_ASSOCIATION: 'TO_GIVE_TO_AN_ASSOCIATION',
  VALIDATION_AUTOMATIC_BY_DELIVERED: 'VALIDATION_AUTOMATIC_BY_DELIVERED',
  VALIDATION_AUTOMATIC_BY_ORDER_ACCEPTED:
    'VALIDATION_AUTOMATIC_BY_ORDER_ACCEPTED',
  VALIDATION_AUTOMATIC_BY_SENT: 'VALIDATION_AUTOMATIC_BY_SENT',
  VALIDATION_BY_DELIVERED: 'VALIDATION_BY_DELIVERED',
  VALIDATION_BY_ORDER_ACCEPTED: 'VALIDATION_BY_ORDER_ACCEPTED',
  VALIDATION_BY_SENT: 'VALIDATION_BY_SENT'
};

export const ORDER_ITEM_CONFORMITY_STATES = {
  ACCEPTED_BY_LOCATION: 'ACCEPTED_BY_LOCATION',
  REFUSED_BY_LOCATION: 'REFUSED_BY_LOCATION',
  ACCEPTED_BY_BUYER: 'ACCEPTED_BY_BUYER',
  REFUSED_BY_BUYER: 'REFUSED_BY_BUYER',
  LOST_BY_LOCATION: 'LOST_BY_LOCATION',
  RECOVERED_BY_BUYER: 'RECOVERED_BY_BUYER'
};
export const ORDER_DELIVERY_STATES = {
  START: 'START',
  DEPOSIT_IN_RELAY_BY_SELLER_IN_PROGRESS:
    'DEPOSIT_IN_RELAY_BY_SELLER_IN_PROGRESS',
  TRANSFER_TO_DESTINATION_RELAY_IN_PROGRESS:
    'TRANSFER_TO_DESTINATION_RELAY_IN_PROGRESS',
  RECOVERY_IN_RELAY_BY_BUYER_IN_PROGRESS:
    'RECOVERY_IN_RELAY_BY_BUYER_IN_PROGRESS',
  PACKAGE_VALIDATION_BY_BUYER_IN_PROGRESS:
    'PACKAGE_VALIDATION_BY_BUYER_IN_PROGRESS',
  END: 'END',
  CARRIER_SEARCH_IN_PROGRESS: 'CARRIER_SEARCH_IN_PROGRESS',
  DELIVERY_IN_PROGRESS: 'DELIVERY_IN_PROGRESS',
  DEPOSIT_TO_COLLECTION_POINT_IN_PROGRESS:
    'DEPOSIT_TO_COLLECTION_POINT_IN_PROGRESS',
  DEPOSIT_IN_MAILBOX_BY_SELLER_IN_PROGRESS:
    'DEPOSIT_IN_MAILBOX_BY_SELLER_IN_PROGRESS'
};

export const ORDER_DELIVERY_STATE_TRANSITIONS = {
  CARRIER_AD_PUBLISHED: 'CARRIER_AD_PUBLISHED',
  CARRIER_FOUND: 'CARRIER_FOUND',
  CARRIER_NOT_FOUND: 'CARRIER_NOT_FOUND',
  DELIVERY_CANCELLED: 'DELIVERY_CANCELLED',
  DELIVERY_COMPLETED: 'DELIVERY_COMPLETED',
  DEPOSITED_IN_RELAY_BY_SELLER: 'DEPOSITED_IN_RELAY_BY_SELLER',
  RECEIVED_BY_DESTINATION_RELAY: 'RECEIVED_BY_DESTINATION_RELAY',
  RECOVERED_IN_RELAY_BY_BUYER: 'RECOVERED_IN_RELAY_BY_BUYER',
  PACKAGE_AUTOMATICALLY_VALIDATED_BY_BUYER:
    'PACKAGE_AUTOMATICALLY_VALIDATED_BY_BUYER',
  PACKAGE_NOT_RECOVERED_BY_BUYER: 'PACKAGE_NOT_RECOVERED_BY_BUYER',
  PACKAGE_NOT_DEPOSITED_BY_SELLER: 'PACKAGE_NOT_DEPOSITED_BY_SELLER',
  PACKAGE_VALIDATED_BY_BUYER: 'PACKAGE_VALIDATED_BY_BUYER',
  PACKAGE_HANDLED_BY_CARRIER: 'PACKAGE_HANDLED_BY_CARRIER',
  DELIVERY_TO_BUYER: 'DELIVERY_TO_BUYER',
  DELIVERED_TO_BUYER: 'DELIVERED_TO_BUYER',
  EXPEDITION_CREATED_BY_SELLER: 'EXPEDITION_CREATED_BY_SELLER'
};

export const ORDER_PROBLEM_STATES = {
  NONE: 'NONE',
  PROBLEM: 'PROBLEM',
  DISPUTED: 'DISPUTED'
};

export const ORDER_PROBLEM_STATE_TRANSITIONS = {
  INIT_PROBLEM: 'INIT_PROBLEM',
  REFUND_PROPOSAL: 'REFUND_PROPOSAL',
  PROBLEM_NEED_CUSTOMER_SERVICE: 'PROBLEM_NEED_CUSTOMER_SERVICE',
  PROBLEM_IS_SOLVED_BY_USERS: 'PROBLEM_IS_SOLVED_BY_USERS',
  PROBLEM_IS_SOLVED_AUTOMATICALLY: 'PROBLEM_IS_SOLVED_AUTOMATICALLY',
  PROBLEM_IS_SOLVED_BY_CUSTOMER_SERVICE: 'PROBLEM_IS_SOLVED_BY_CUSTOMER_SERVICE'
};

export const ORDER_DELAYS = {
  locationdelivery: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 10,
    DELIVERED: ONE_DAY * 10,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  },
  mondialrelay: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 10,
    DELIVERED: ONE_DAY * 10,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  },
  colissimo: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 10,
    DELIVERED: ONE_DAY * 10,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  },
  lapostecolissimo: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 10,
    DELIVERED: ONE_DAY * 10,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  },
  lapostecourriersuivi: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 10,
    DELIVERED: ONE_DAY * 10,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  },
  handdelivery: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 10,
    DELIVERED: ONE_DAY * 10,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  },
  relaiscolis: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 3,
    DELIVERED: ONE_DAY * 3,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  },
  cocolis: {
    ORDERED: ONE_DAY * 3,
    ORDER_ACCEPTED: ONE_WEEK,
    DISTRIBUTED: ONE_DAY * 3,
    DELIVERED: ONE_DAY * 3,
    END: 0,
    NOT_DISTRIBUTED: 0,
    NOT_DELIVERED: 0,
    DELIVERED_PROBLEM: 0
  }
};
