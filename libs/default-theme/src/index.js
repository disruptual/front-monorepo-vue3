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
    brand: '#FF6600',
    success: '#1e7a3a',
    error: '#C95242',
    warning: '#efd037',
    gray: '#777',
    blue: '#4287f5',
    red: '#f54242',
    orange: '#ed9c2b',
    yellow: '#f0de16',
    green: '#4be620',
    teal: '#13f0cf',
    purple: '#8913f0'
  },
  colors: {
    text: '#000',
    textLight: '#666',
    textLighter: '#fff',
    textDisabled: '#999',
    background: '#f0f0f0',
    surface: '#fff',
    separator: '#c0c0c0',
    disabled: '#cccccc',
    primary: 'var(--color-brand-400)'
  }
};
