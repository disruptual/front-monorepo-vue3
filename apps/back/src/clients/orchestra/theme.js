import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import KabelMedium from './assets/fonts/KABELMED.ttf';
import KabelLight from './assets/fonts/KABELLIGHT.ttf';
import KabelBold from './assets/fonts/KABELBOLD.ttf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: KabelMedium,
      400: KabelLight,
      700: KabelBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#aad29a',
      minLightness: 0.1,
      maxLightness: 0.85,
      saturationAdjust: 0.15,
      lightnessAdjust: 0.25
    }
  }
});
