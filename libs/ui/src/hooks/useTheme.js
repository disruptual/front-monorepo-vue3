import { inject } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

export const useTheme = () => inject(CONTEXT_KEYS.THEME);
