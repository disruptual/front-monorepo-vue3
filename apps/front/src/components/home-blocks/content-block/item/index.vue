<script>
export default { name: 'HomeContentBlockItem' };
</script>

<script setup>
import ItemGrid from '@/components/item/grid/index.vue';

const props = defineProps({
  data: { type: Array, required: true },
  block: { type: Object, required: true }
});
</script>

<template>
  <ItemGrid :items="props.data" />
</template>
