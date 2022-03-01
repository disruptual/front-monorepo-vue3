
import { OrderProblem, OrderProblemService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useOrderProblemApi() {
  return useCRUDApi({ model: OrderProblem, service: OrderProblemService });
}
