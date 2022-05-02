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
  <dsp-flex
    v-if="delivery"
    class="delivery-card"
    direction="column"
    justify="center"
    gap="md"
  >
    <dsp-icon :icon="delivery.iconName" class="delivery-icon" />
    <dsp-flex class="delivery-infos">
      <span>{{ delivery.tag }}</span>
    </dsp-flex>
  </dsp-flex>
</template>
