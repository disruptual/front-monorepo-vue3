import MulishRegular from './assets/fonts/Mulish-Medium.ttf';
import MulishBold from './assets/fonts/Mulish-Bold.ttf';
import MulishLight from './assets/fonts/Mulish-Light.ttf';
import icons from './assets/icons';

export default {
  icons,
  fonts: {
    body: {
      300: MulishLight,
      400: MulishRegular,
      700: MulishBold
    }
  },
  palettes: {
    brand: '#F06305',
    success: '#56A25C',
    error: '#C95242',
    warning: '#EBBE5E'
  },
  colors: {
    text: '#000',
    textLight: '#666',
    textLighter: '#fff',
    textDisabled: '#999',
    background: '#f0f0f0',
    surface: '#fff',
    separator: '#c0c0c0',
    disabled: '#cccccc'
  }
};
