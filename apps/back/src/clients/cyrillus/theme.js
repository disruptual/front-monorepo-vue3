import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';

export default merge({}, theme, {
  palettes: {
    brand: {
      baseColor: '#526D5B',
      saturationAdjust: 0.02
    }
  }
});
