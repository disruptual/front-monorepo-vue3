import { Remuneration, RemunerationService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useRemunerationApi() {
  return useCRUDApi({ model: Remuneration, service: RemunerationService });
}
