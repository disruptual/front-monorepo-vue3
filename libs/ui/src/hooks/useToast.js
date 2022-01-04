import { inject } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

export const useToast = () => inject(CONTEXT_KEYS.TOAST);
