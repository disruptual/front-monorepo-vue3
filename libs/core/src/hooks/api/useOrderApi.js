import { computed } from 'vue';
import { useMutation } from 'vue-query';
import { Order, OrderService } from '@dsp/business';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery.js';
import { useCRUDApi } from '../useCRUDApi';

export function useOrderApi() {
  return useCRUDApi({ model: Order, service: OrderService }, orderService => ({
    findAllByUserIdQuery(userId, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/${userId}/orders`);

      return useCollectionQuery(
        queryKey,
        () => orderService.findAllByUserId(userId),
        { model: Order, relations, itemsPerPage: Infinity }
      );
    },

    findAllSalesByUserIdQuery(userId, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/${userId}/sales`);

      return useCollectionQuery(
        queryKey,
        () => orderService.findAllSalesByUserId(userId),
        { model: Order, relations, itemsPerPage: Infinity }
      );
    },

    rollbackMutation(requestOptions) {
      return useMutation(
        `rollBackOrder`,
        ({ id, deliveryState, deliveryStateTransition }) =>
          orderService.rollback(id, { deliveryState, deliveryStateTransition }),
        requestOptions
      );
    },

    forwardMutation(requestOptions) {
      return useMutation(
        `forwardBackOrder`,
        ({ id, deliveryTag, transition }) =>
          orderService.forward(id, { deliveryTag, transition }),
        requestOptions
      );
    },

    cancelDisputeMutation(requestOptions) {
      return useMutation(
        `cancelDispute`,
        id => orderService.cancelDispute(id),
        requestOptions
      );
    }
  }));
}
