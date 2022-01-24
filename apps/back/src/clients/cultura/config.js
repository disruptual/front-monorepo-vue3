import { merge } from 'lodash-es';
import defaultConfig from '../disruptual/config';
import logo from 'client/assets/logo.svg';

export default merge({}, defaultConfig, {
  features: {
    admin: {
      isEnabled: true,
      events: { isEnabled: true },
      stores: { isEnabled: false }
    }
  },
  DefaultLayoutHeader: { isLogoDisplayed: true },
  logo,
  dataStudio: "https://datastudio.google.com/embed/reporting/a4c1aaf5-8bf1-40e6-a99a-bb7f40da761f/page/hvKhB"
});
