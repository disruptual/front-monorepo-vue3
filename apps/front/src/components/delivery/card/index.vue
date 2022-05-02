<script>
export default { name: 'DeliveryCard' };
</script>

<script setup>
import { Delivery } from '@dsp/business';

const props = defineProps({
  delivery: { type: Delivery, required: true }
});
</script>

<template>
  <dsp-flex v-if="delivery" justify="center" gap="md">
    <dsp-icon :icon="delivery.tag" size="lg" />
  </dsp-flex>
</template>
