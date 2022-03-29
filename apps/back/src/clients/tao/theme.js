import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import DinCondRegular from './assets/fonts/DINCond-Medium.otf';
import DinCondLight from './assets/fonts/DINCond-Regular.otf';
import DinCondBold from './assets/fonts/DINCond-Bold.otf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: DinCondRegular,
      400: DinCondLight,
      700: DinCondBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#2EA5A2',
      minLightness: 0.1,
      maxLightness: 0.85,
      saturationAdjust: -0.15,
      lightnessAdjust: 0.2
    }
  }
});
