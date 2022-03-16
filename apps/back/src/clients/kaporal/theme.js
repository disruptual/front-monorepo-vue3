import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import AntiqueLegacyRegular from './assets/fonts/Antique-Legacy-Medium.otf';
import AntiqueLegacyLight from './assets/fonts/Antique-Legacy-Thin.otf';
import AntiqueLegacyBold from './assets/fonts/Antique-Legacy-Semibold.otf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: AntiqueLegacyLight,
      400: AntiqueLegacyRegular,
      700: AntiqueLegacyBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#111111',
      minLightness: 0.03,
      maxLightness: 0.95,
      lightnessAdjust: -0.15
    }
  }
});
