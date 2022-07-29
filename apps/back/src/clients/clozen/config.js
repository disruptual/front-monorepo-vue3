import { merge } from 'lodash-es';
import defaultConfig from '../disruptual/config';
import logo from 'client/assets/logo.svg?url';

export default merge({}, defaultConfig, {
  logo,
  features: {
    currency: {
      shouldRoundIntegerValues: false,
      currency: 'CHF',
      locale: 'de-CH',
      symbol: 'CHF'
    }
  }
});
