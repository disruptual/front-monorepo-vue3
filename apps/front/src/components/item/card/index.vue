<script>
export default { name: 'ItemCard' };
</script>
<script setup>
import schema from './index.schema';
const props = defineProps(schema.toProps());

const { variantComponent, variantProps } = schema.toVariant(props);
</script>

<template>
  <component :is="variantComponent" v-bind="variantProps">
    <slot v-for="(_, name) in $slots" :name="name" />
  </component>
</template>
