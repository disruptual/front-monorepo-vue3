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
const { t } = useI18n();
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
      orderState: step.state,
      orderStateTransition: step.transition
    });
    emit('rollback');
    // eslint-disable-next-line no-empty
  } catch (err) {
    showError(err.message);
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
    // eslint-disable-next-line no-empty
  } catch (err) {
    showError(err.message);
  }
};
</script>

<template>
  <dsp-flex
    v-if="currentUser.isProjectManager"
    wrap="nowrap"
    gap="md"
    class="rollback-infos"
    align="center"
  >
    <dsp-center class="rollback-infos__icon">
      <dsp-icon icon="info" />
    </dsp-center>
    <span>
      Il n'est pas possible de revenir en arrière dans l'état d'une commande si
      celle-ci est finalisée ou qu'elle a subi un litige. Il est également
      impossible de revenir avant la validation de la commande. par le vendeur.
    </span>
  </dsp-flex>

  <ul>
    <dsp-flex
      v-for="(step, index) in order.history"
      :key="step.id"
      as="li"
      justify="space-between"
      align="center"
    >
      <dsp-truncated-text>
        <span class="step__date">
          {{ step.formatCreated('d MMM yyyy à HH:mm') }}
        </span>
        <span>{{ t(`order.status.${step.status}`) }}</span>
      </dsp-truncated-text>
      <dsp-loading-button
        v-if="currentUser.isProjectManager && index !== 0"
        left-icon="reset"
        :disabled="!step.isRollbackable(order)"
        is-outlined
        :is-loading="isRollbackLoading"
        @click="onRollback(step)"
      >
        <span class="button-label">Revenir à l'état</span>
      </dsp-loading-button>

      <dsp-loading-button
        v-else-if="currentUser.isProjectManager"
        :disabled="!order.nextTransition"
        left-icon="fastForward"
        :is-loading="isForwardLoading"
        @click="onForward"
      >
        <span class="button-label">Avancer l'état</span>
      </dsp-loading-button>
    </dsp-flex>
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

.rollback-infos {
  color: var(--color-warning-800);
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  background-color: var(--color-warning-100);

  > * {
    padding: var(--spacing-sm);
  }
}

.rollback-infos__icon {
  align-self: stretch;
  background-color: var(--color-warning-300);
}

.step__date {
  font-size: var(--font-size-sm);
  margin-right: var(--spacing-sm);
}

button {
  @include not-mobile {
    width: 12em;
  }
}
</style>
