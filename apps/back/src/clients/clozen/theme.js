import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import HelveticaNeueRegular from './assets/fonts/HelveticaNeue_regular.ttf';
import HelveticaNeueBold from './assets/fonts/HelveticaNeue_bold.ttf';

export default merge({}, theme, {
  fonts: {
    body: {
      400: HelveticaNeueRegular,
      700: HelveticaNeueBold
    }
  },
  palettes: {
    brand: {
      baseColor: '#F4A650'
    }
  }
});
