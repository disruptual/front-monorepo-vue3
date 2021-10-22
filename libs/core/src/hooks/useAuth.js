import { inject } from 'vue';
import { PROVIDER_KEYS } from '../utils/constants';

export function useAuth() {
  return inject(PROVIDER_KEYS.AUTH_SERVICE);
}
