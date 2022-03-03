<script>
export default { name: 'OrderValidationModal' };
</script>

<script setup>
import { Order } from '@dsp/business';

defineProps({
  order: { type: Order, required: true },
  isOpened: { type: Boolean, required: true }
});
const emit = defineEmits(['close']);
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="emit('close')">
    Order Validation modal
  </dsp-modal>
</template>
