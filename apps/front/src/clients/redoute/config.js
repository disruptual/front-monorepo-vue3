import { merge } from 'lodash-es';
import defaultConfig from '../disruptual/config';
import logo from 'client/assets/logo.svg?url';

export default merge({}, defaultConfig, {
  logo,
  DspButton: { isRounded: false },
  HeaderAnnouncement: {
    backgroundColor: 'accent-400'
  },
  HeaderCategoriesNav: {
    hasMainsiteLink: true,
    mainsitUrl: 'https://laredoute.fr'
  }
});
