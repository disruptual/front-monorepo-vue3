<script>
export default { name: 'DspButton' };
</script>
<script setup>
import schema from './index.schema';
import { noop } from '@dsp/core';

const props = defineProps({
  isFullWidth: { type: Boolean, default: false },
  isOutlined: { type: Boolean, default: false },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null },
  buttonRef: { type: Function, default: noop },
  ...schema.toProps()
});

const { variantComponent, variantProps } = schema.toVariant(props);
</script>

<template>
  <component :is="variantComponent" v-bind="variantProps">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </component>
</template>
