import { inject } from 'vue';
import { PROVIDER_KEYS } from '../utils/constants';

export function useHttp() {
  return inject(PROVIDER_KEYS.HTTP_SERVICE);
}
