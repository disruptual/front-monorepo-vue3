import { merge } from 'lodash-es';
import defaultConfig from '../disruptual/config';
import logo from 'client/assets/logo.svg';

export default merge({}, defaultConfig, {
  features: {
    admin: {
      isEnabled: true,
      events: { isEnabled: false },
      stores: { isEnabled: false }
    }
  },
  DefaultLayoutHeader: { isLogoDisplayed: true },
  logo
});
