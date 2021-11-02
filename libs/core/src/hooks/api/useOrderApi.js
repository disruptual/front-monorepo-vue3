import { computed, unref } from 'vue';
import { Order, OrderService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery.js';
import { serializeQueryString, useModelQuery } from '@dsp/core/index';

export function useOrderApi() {
  const http = useHttp();
  const orderService = new OrderService({ http });

  return {
    findAllByUserIdQuery(userId, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/${userId}/orders`);

      return useCollectionQuery(
        queryKey,
        () => orderService.findAllByUserId(userId),
        { model: Order, relations }
      );
    },

    findByOrderIdQuery(orderId, { relations = [] } = {}) {
      const queryKey = computed(() => `orders/${orderId}`);

      return useModelQuery(
        queryKey,
        () => orderService.findByOrderId(orderId),
        { model: Order, relations }
      );
    },

    findAllQuery(
      { relations = [], itemsPerPage = 30, filters = {} } = {},
      ...options
    ) {
      const queryKey = computed(
        () => `/orders?${serializeQueryString(unref(filters))}`
      );

      const queryOptions = computed(() => ({
        model: Order,
        itemsPerPage,
        relations,
        ...options
      }));

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return orderService.findAll({
          params: { ...pageParam, ...unref(filters) }
        });
      };

      return useCollectionQuery(queryKey, queryFn, queryOptions);
    }
  };
}
