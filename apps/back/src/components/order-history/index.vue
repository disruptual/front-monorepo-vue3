<script>
export default { name: 'OrderHistory' };
</script>

<script setup>
import { Order } from '@dsp/business';
import { useI18n } from 'vue-i18n';
import { useOrderApi } from '@dsp/core';
import { useCurrentUser } from '@dsp/core';
import { useToast } from '@dsp/ui';

const props = defineProps({
  order: { type: Order, required: true }
});
const emit = defineEmits(['rollback', 'forward']);
const { t, te } = useI18n();
const { data: currentUser } = useCurrentUser();
const { showError } = useToast();

const { rollbackMutation, forwardMutation } = useOrderApi();
const { mutateAsync: rollback, isLoading: isRollbackLoading } =
  rollbackMutation();
const { mutateAsync: forward, isLoading: isForwardLoading } = forwardMutation();

const onRollback = async step => {
  try {
    await rollback({
      id: props.order.id,
      deliveryState: step.state,
      deliveryStateTransition: step.transition
    });
    emit('rollback');
  } catch (err) {
    console.error(err);
    showError(t('toasts.orderHistory.rollbackError'));
  }
};

const onForward = async () => {
  try {
    await forward({
      id: props.order.id,
      deliveryTag: props.order.delivery.tag,
      transition: props.order.nextTransition
    });
    emit('forward');
  } catch (err) {
    console.error(err);
    showError(t('toasts.orderHistory.forwardError'));
  }
};

const getStepDescription = step => {
  const translationKey = `orderHistory.${props.order.delivery.tag}.${step.status}.description`;
  if (!te(translationKey)) return '';

  return t(translationKey, getStepTranslationVariables(step));
};

const getStepTranslationVariables = step => {
  return {
    orderId: props.order.id,
    delivery: props.order.delivery.name,
    buyer: props.order.buyer.firstName,
    seller: props.order.seller.firstName,
    refundAmount: props.order.refundAmount,
    orderNumber: props.order.id,
    orderPrice: props.order.totalPrice,
    orderPriceWithFees: props.order.totalAmount,
    location: props.order.location?.name,
    warehouseLocation: props.order.warehouseLocation?.name,
    depositRelay: props.order.deliveryDetail?.depositRelayName,
    destinationRelay: props.order.deliveryDetail?.destinationRelayName,
    maxDate: step.getMaxDate(props.order.delivery)
  };
};

const getTranslationKey = step => {
  const baseKey = `order.status.${step.status}`;
  const keyWithDelivery = `order.status.${props.order.delivery?.tag}.${step.status}`;

  return te(keyWithDelivery) ? keyWithDelivery : baseKey;
};
</script>

<template>
  <dsp-alert v-if="currentUser.isProjectManager" color-scheme="yellow">
    {{ t('orderHistory.warning') }}
  </dsp-alert>

  <ul>
    <li v-for="(step, index) in order.history" :key="step.id" as="li">
      <dsp-flex justify="space-between" align="center">
        <dsp-truncated-text>
          <span class="step__date">
            {{ step.formatCreated('d MMM yyyy à HH:mm') }}
          </span>
          <span>{{ t(getTranslationKey(step)) }}</span>
        </dsp-truncated-text>
        <dsp-loading-button
          v-if="currentUser.isProjectManager && index !== 0"
          left-icon="reset"
          :disabled="!step.isRollbackable(order)"
          is-outlined
          :is-loading="isRollbackLoading"
          @click="onRollback(step)"
        >
          <span class="button-label">{{ t('orderHistory.previous') }}</span>
        </dsp-loading-button>
        <dsp-loading-button
          v-else-if="currentUser.isProjectManager"
          :disabled="!order.nextTransition"
          left-icon="fastForward"
          :is-loading="isForwardLoading"
          @click="onForward"
        >
          <span class="button-label">{{ t('orderHistory.next') }}</span>
        </dsp-loading-button>
      </dsp-flex>
      <div class="step__description">{{ getStepDescription(step) }}</div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  padding: var(--spacing-sm);

  &:nth-of-type(odd) {
    background-color: var(--color-gray-50);
  }
}

.step__date {
  font-size: var(--font-size-sm);
  margin-right: var(--spacing-sm);
}

.step__description {
  font-size: var(--font-size-sm);
}

button {
  @include not-mobile {
    width: 12em;
  }
}
</style>
