<script>
export default { name: 'DspButton' };
</script>
<script setup>
import schema from './index.schema';

const props = defineProps({
  isFullWidth: { type: Boolean, default: false },
  isOutlined: { type: Boolean, default: false },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null },
  ...schema.toProps()
});

const { variantComponent, variantProps } = schema.toVariant(props);
</script>

<template>
  <component :is="variantComponent" v-bind="variantProps">
    <slot v-for="(_, name) in $slots" :name="name" />
  </component>
</template>
