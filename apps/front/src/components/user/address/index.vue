<script>
export default { name: 'UserAddress' };
</script>

<script setup>
import { Address } from '@dsp/business';

const props = defineProps({
  address: { type: [Address, null], required: true },
  iconSize: { type: String, default: 'md' }
});
</script>

<template>
  <dsp-flex v-if="props.address?.city" gap="sm" align="center">
    <slot>
      <dsp-icon icon="mapDot" :size="iconSize" />
      <span>
        {{ props.address.city }} {{ `(${props.address.postalCode})` }}
      </span>
    </slot>
  </dsp-flex>
</template>
