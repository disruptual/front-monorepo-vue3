<script>
export default { name: 'CloseProblemModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOrderApi } from '@dsp/core';
import { useToast } from '@dsp/ui';
import { Order } from '@dsp/business';

const props = defineProps({
  order: { type: Order, required: true },
  isOpened: { type: Boolean, required: true }
});

const emit = defineEmits(['close', 'success']);

const { t } = useI18n();
const { showSuccess, showError } = useToast();
const { mutate: cancelDispute, isLoading } =
  useOrderApi().cancelDisputeMutation({
    onSuccess() {
      showSuccess('Le litige a été annulé');
      emit('success');
      emit('close');
    },
    onError(err) {
      console.error(err);
      showError("Erreur lors de l'annulation du litige.");
    }
  });
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="$emit('close')">
    <h4 class="order-dispute-cancel_title">Clore le litige</h4>
    <p class="order-dispute-cancel_subtitle">
      Êtes vous sûr de vouloir clore ce litige ?
    </p>
    <dsp-flex justify="flex-end" gap="md" as="footer">
      <dsp-button is-outlined @click="$emit('close')">
        {{ t('no') }}
      </dsp-button>
      <dsp-loading-button
        :is-loading="isLoading"
        @click="cancelDispute(order.id)"
      >
        {{ t('yes') }}
      </dsp-loading-button>
    </dsp-flex>
  </dsp-modal>
</template>

<style lang="scss" scoped>
h4 {
  font-size: var(--font-size-lg);
  margin-top: 0;
}

footer {
  margin-top: var(--spacing-lg);
}
</style>
