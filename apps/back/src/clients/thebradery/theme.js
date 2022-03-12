import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import WorkSansRegular from './assets/fonts/WorkSans-Regular.ttf';
import WorkSansBold from './assets/fonts/WorkSans-Bold.ttf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: WorkSansRegular,
      400: WorkSansRegular,
      700: WorkSansBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#002961',
      minLightness: 0.05,
      maxLightness: 0.95,
      lightnessAdjust: 0
    }
  }
});
