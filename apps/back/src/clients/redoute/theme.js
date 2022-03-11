import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';

export default merge({}, theme, {
  palettes: {
    brand: {
      baseColor: '#131313',
      minLightness: 0.08,
      maxLightness: 0.88,
      lightnessAdjust: -0.05
    },
    accent: {
      baseColor: '#4CC2B4',
      minLightness: 0.02,
      maxLightness: 0.75,
      lightnessAdjust: 0.2
    }
  }
});
