import { computed, unref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOrderApi } from '@dsp/core';
import { ORDER_STATES } from '@dsp/business';

export const useStoreOrder = (orderId, { queryOptions = {} } = {}) => {
  const { t } = useI18n();
  const query = useOrderApi().findByIdQuery(orderId, {
    ...queryOptions,
    relations: ['delivery', ...(queryOptions.relations || [])]
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
      suffix = `${order.orderState}.${order.orderStateTransition}`;
    } else {
      suffix = `${order.orderState}`;
    }

    return t(`order.store.invalidMessages.${suffix}`);
  });

  return { query, invalidOrderMessage, isOrderValid };
};
