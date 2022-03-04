import { merge } from 'lodash-es';
import defaultConfig from '../disruptual/config';
import logo from 'client/assets/logo.svg?url';

export default merge({}, defaultConfig, {
  logo
});
