import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import MontserratRegular from './assets/fonts/Montserrat-Regular.ttf';
import MontserratLight from './assets/fonts/Montserrat-Light.ttf';
import MontserratBold from './assets/fonts/Montserrat-Bold.ttf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: MontserratLight,
      400: MontserratRegular,
      700: MontserratBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#01B1E9',
      minLightness: 0.1,
      maxLightness: 0.95,
      saturationAdjust: -0.05,
      lightnessAdjust: 0.1
    }
  }
});
