import { merge } from 'lodash-es';
import defaultConfig from '../disruptual/config';
import logo from 'client/assets/logo.svg?url';

export default merge({}, defaultConfig, {
  features: {
    admin: {
      events: { isEnabled: false },
      stores: { isEnabled: false }
    }
  },
  DefaultLayoutHeader: { isLogoDisplayed: true },
  UserDetails: {
    isSSOCustomerIdDisplayed: true
  },
  logo
});
