import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import SourceSansProRegular from './assets/fonts/SourceSansPro-Regular.ttf';
import SourceSansProLight from './assets/fonts/SourceSansPro-Light.ttf';
import SourceSansProBold from './assets/fonts/SourceSansPro-Bold.ttf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: SourceSansProLight,
      400: SourceSansProRegular,
      700: SourceSansProBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#131313',
      minLightness: 0.1,
      maxLightness: 0.98,
      lightnessAdjust: -0.1
    },
    accent: {
      baseColor: '#4CC2B4',
      minLightness: 0.02,
      maxLightness: 0.75,
      lightnessAdjust: 0.2,
      saturationAdjust: 0.05
    }
  }
});
