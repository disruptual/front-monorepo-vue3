import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import NunitoRegular from './assets/fonts/Nunito-Regular.ttf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: NunitoRegular,
      400: NunitoRegular,
      700: NunitoRegular
    }
  },
  palettes: {
    brand: {
      baseColor: '#9964A9',
      saturationAdjust: 0.1,
      lightnessAdjust: 0
    }
  }
});
