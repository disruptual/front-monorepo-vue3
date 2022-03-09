import { OrderProblem, OrderProblemService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';
import { useMutation } from 'vue-query';

export function useOrderProblemApi() {
  return useCRUDApi(
    { model: OrderProblem, service: OrderProblemService },
    orderProblemService => ({
      solveMutation(options) {
        return useMutation(
          `solveProblem`,
          ({ id, entity }) => orderProblemService.solveById(id, entity),
          options
        );
      }
    })
  );
}
