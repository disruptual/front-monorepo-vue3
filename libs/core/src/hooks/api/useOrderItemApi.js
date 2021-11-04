import { computed, reactive } from 'vue';
import { OrderItem, OrderItemService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';

export function useOrderItemApi() {
  const http = useHttp();
  const orderItemService = new OrderItemService({ http });

  return {
    findAllByOrderIdQuery(orderId, { relations = [] } = {}) {
      const queryKey = computed(() => `/orders/${orderId}/order_items`);

      return useCollectionQuery(
        queryKey,
        () => orderItemService.findAllByOrderId(orderId),
        { model: OrderItem, relations }
      );
    }
  };
}
