import logo from 'client/assets/logo.svg';

export default {
  sso: {
    isEnabled: false
  },
  features: {
    admin: {
      isEnabled: true,
      contacts: { isEnabled: true },
      emails: { isEnabled: true },
      events: { isEnabled: true },
      items: { isEnabled: true },
      orders: { isEnabled: true },
      stores: { isEnabled: true },
      users: { isEnabled: true },
      vouchers: { isEnabled: true }
    },
    settings: {
      isEnabled: true,
      carousel: { isEnabled: true },
      announcements: { isEnabled: true },
      homeBlocks: { isEnabled: true }
    },
    store: {
      isEnabled: false
    },
    eventStore: {
      isEnabled: false
    }
  },
  logo
};
