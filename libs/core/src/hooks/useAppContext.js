import { inject } from 'vue';
import { PROVIDER_KEYS } from '@dsp/core/utils/constants';
export const useAppContext = () => {
  return inject(PROVIDER_KEYS.APP_CONTEXT);
};
