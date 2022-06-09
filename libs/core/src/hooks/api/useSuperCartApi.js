
import { SuperCart, SuperCartService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useSuperCartApi() {
  return useCRUDApi({ model: SuperCart, service: SuperCartService });
}
