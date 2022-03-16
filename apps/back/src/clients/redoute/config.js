import { merge } from 'lodash-es';
import defaultConfig from '../disruptual/config';
import logo from 'client/assets/logo.svg?url';

export default merge({}, defaultConfig, {
  logo,
  features: {
    admin: {
      events: { isEnabled: false },
      stores: { isEnabled: false }
    }
  },
  DefaultLayoutHeader: { isLogoDisplayed: true },
  DspMenu: { activeColor: 'accent-500' },
  DspAvatar: { bgColor: 'accent-500' }
});
