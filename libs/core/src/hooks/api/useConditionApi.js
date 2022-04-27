
import { Condition, ConditionService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useConditionApi() {
  return useCRUDApi({ model: Condition, service: ConditionService });
}
