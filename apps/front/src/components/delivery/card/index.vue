<script>
export default { name: 'DeliveryCard' };
</script>

<script setup>
import { Delivery } from '@dsp/business';
import { vTooltip } from '@dsp/ui';

const props = defineProps({
  delivery: { type: Delivery, required: true }
});
</script>

<template>
  <dsp-flex v-if="delivery" v-tooltip="delivery.name" justify="center" gap="md">
    <dsp-icon :icon="delivery.tag" size="lg" />
  </dsp-flex>
</template>
