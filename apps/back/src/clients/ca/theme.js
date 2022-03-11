import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import CASansRegular from './assets/fonts/CASans-Regular.otf';
import CASansLight from './assets/fonts/CASans-Light.otf';
import CASansBold from './assets/fonts/CASans-Bold.otf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: CASansLight,
      400: CASansRegular,
      700: CASansBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#E40924',
      lightnessAdjust: -0.05
    },
    error: {
      baseColor: '#777777'
    }
  }
});
