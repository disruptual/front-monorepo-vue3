import { inject } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

export const useThemeService = () => inject(CONTEXT_KEYS.THEME_SERVICE);
