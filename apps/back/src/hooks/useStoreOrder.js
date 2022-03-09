import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOrderApi, useOrderItemApi, useCurrentUser } from '@dsp/core';
import {
  ORDER_STATES,
  ORDER_STATE_TRANSITIONS,
  ORDER_ITEM_CONFORMITY_STATES
} from '@dsp/business';
import { STORE_OPERATIONS } from '@/utils/constants';

export const useStoreOrder = (orderId, { queryOptions = {} } = {}) => {
  const { t } = useI18n();

  const { data: currentUser } = useCurrentUser({ relations: 'storeLocation' });
  const query = useOrderApi().findByIdQuery(orderId, {
    ...queryOptions,
    relations: ['delivery', 'location', ...(queryOptions.relations || [])]
  });

  const isOrderValid = computed(() => {
    const order = query.data.value;
    if (!order) return false;
    if (!order.delivery) return false;

    if (!order.isLocationDelivery) return false;

    return [
      ORDER_STATES.ORDER_ACCEPTED,
      ORDER_STATES.DISTRIBUTED,
      ORDER_STATES.STORE_TO_STORE_IN_TRANSIT
    ].includes(order.orderState);
  });

  const invalidOrderMessage = computed(() => {
    const order = query.data.value;
    if (!order) return null;

    let suffix;
    if (!order.isLocationDelivery) {
      suffix = 'wrongDelivery';
    } else if (order.isEnded) {
      console.log(order);
      suffix = `${order.orderState}.${order.orderStateTransition}`;
    } else {
      suffix = `${order.orderState}`;
    }

    return t(`order.store.invalidMessages.${suffix}`);
  });

  const { mutateAsync: updateOrderItems } =
    useOrderItemApi().updateManyMutation();
  const { mutateAsync: updateOrderState } = useOrderApi().forwardMutation();
  const { mutateAsync: updateOrder } = useOrderApi().updateMutation();

  const mapOrderItemTransitions = transitions =>
    Object.entries(transitions).map(([id, conformityState]) => ({
      id,
      entity: {
        conformityState
      }
    }));

  const isStoreToStoreDeposit = computed(() => {
    if (!currentUser.value.storeLocation) return false;
    const order = query.data.value;

    return currentUser.value.storeLocation?.id !== order.location?.id;
  });

  const transitions = {
    [STORE_OPERATIONS.SELLER_DEPOSIT](orderItems) {
      const transitions = Object.values(orderItems);
      const isRefused = transitions.every(
        t => t === ORDER_ITEM_CONFORMITY_STATES.REFUSED_BY_LOCATION
      );

      if (isRefused) return ORDER_STATE_TRANSITIONS.STORE_REFUSE;

      return isStoreToStoreDeposit.value
        ? ORDER_STATE_TRANSITIONS.STORE_TO_STORE_ACCEPT
        : ORDER_STATE_TRANSITIONS.STORE_ACCEPT;
    },
    [STORE_OPERATIONS.BUYER_PICKUP](orderItems) {
      const transitions = Object.values(orderItems);
      const isRefused = transitions.every(
        t => t === ORDER_ITEM_CONFORMITY_STATES.REFUSED_BY_BUYER
      );

      return isRefused
        ? ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_REFUSE
        : ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_ACCEPT;
    }
  };

  return {
    query,
    invalidOrderMessage,
    isOrderValid,
    async depositBySeller(orderItemsTransitions) {
      const order = query.data.value;
      await updateOrderItems(mapOrderItemTransitions(orderItemsTransitions));

      await updateOrder({
        id: orderId,
        entity: {
          warehouseLocation: isStoreToStoreDeposit.value
            ? currentUser.value.storeLocation.uri
            : order.location.uri
        }
      });

      await updateOrderState({
        id: order.id,
        deliveryTag: order.delivery.tag,
        transition: transitions[STORE_OPERATIONS.SELLER_DEPOSIT](
          orderItemsTransitions
        )
      });
    },

    async pickupByBuyer(orderItemsTransitions) {
      const order = query.data.value;

      await updateOrderItems(mapOrderItemTransitions(orderItemsTransitions));

      await updateOrderState({
        id: order.id,
        deliveryTag: order.delivery.tag,
        transition: transitions[STORE_OPERATIONS.BUYER_PICKUP](
          orderItemsTransitions
        )
      });
    },

    async pickupBySeller() {
      alert('Restitution vendur TODO');
    }
  };
};
