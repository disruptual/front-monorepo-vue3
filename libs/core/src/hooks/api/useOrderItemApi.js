import { computed } from 'vue';
import { useCRUDApi } from '../useCRUDApi';
import { OrderItem, OrderItemService } from '@dsp/business';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';

export function useOrderItemApi() {
  return useCRUDApi(
    { model: OrderItem, service: OrderItemService },
    orderItemService => ({
      findAllByOrderIdQuery(orderId, { relations = [] } = {}) {
        const queryKey = computed(() => `/orders/${orderId}/order_items`);

        return useCollectionQuery(
          queryKey,
          () => orderItemService.findAllByOrderId(orderId),
          { model: OrderItem, relations }
        );
      }
    })
  );
}
