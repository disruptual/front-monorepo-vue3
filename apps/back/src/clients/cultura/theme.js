import theme from '@dsp/default-theme';
import { merge } from 'lodash-es';
import PoppinsRegular from './assets/fonts/Poppins-Regular.ttf';
import PoppinsLight from './assets/fonts/Poppins-Light.ttf';
import PoppinsBold from './assets/fonts/Poppins-Bold.ttf';

export default merge({}, theme, {
  fonts: {
    body: {
      300: PoppinsLight,
      400: PoppinsRegular,
      700: PoppinsBold
    }
  },
  palettes: { brand: '#026060' }
});
