import { computed } from 'vue';
import { Order, OrderService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery.js';

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
    }
  };
}
