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
    brand: {
      baseColor: '#e87c3a',
      minLightness: 0.1,
      maxLightness: 0.8,
      saturationAdjust: 0.25,
      lightnessAdjust: 0.13
    },
    success: '#1e7a3a',
    error: '#f54242',
    warning: {
      baseColor: 'hsl(50,100%,50%)',
      minLightness: 0.08,
      maxLightness: 0.88,
      saturationAdjust: 0.5,
      lightnessAdjust: 0.05
    },
    red: '#f54242',
    orange: {
      baseColor: '#e87c3a',
      minLightness: 0.03,
      maxLightness: 0.8,
      saturationAdjust: 0.25,
      lightnessAdjust: 0.13
    },
    yellow: {
      baseColor: 'hsl(50,100%,50%)',
      minLightness: 0.08,
      maxLightness: 0.88,
      saturationAdjust: 0.5,
      lightnessAdjust: 0.05
    },
    green: { baseColor: '#4be620', minLightness: 0.12 },
    teal: { baseColor: '#13f0cf', minLightness: 0.1 },
    blue: { baseColor: '#4287f5', saturationAdjust: 0.05 },
    indigo: { baseColor: '#1714e2', lightnessAdjust: 0.05 },
    purple: '#8913f0',
    pink: { baseColor: '#f229da', minLightness: 0.14 },
    gray: {
      baseColor: 'hsl(0,0%,50%)',
      minLightness: 0,
      maxLightness: 1
    },
    coldgray: {
      baseColor: 'hsl(210,8%,50%)',
      minLightness: 0.1,
      maxLightness: 0.98
    },
    warmgray: {
      baseColor: 'hsl(25,8%,50%)',
      minLightness: 0.1,
      maxLightness: 0.98
    }
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
