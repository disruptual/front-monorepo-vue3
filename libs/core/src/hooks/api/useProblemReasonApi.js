
import { ProblemReason, ProblemReasonService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useProblemReasonApi() {
  return useCRUDApi({ model: ProblemReason, service: ProblemReasonService });
}
