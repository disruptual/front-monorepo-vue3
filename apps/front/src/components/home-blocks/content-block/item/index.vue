<script>
export default { name: 'HomeContentBlockItem' };
</script>

<script setup>
import { computed } from 'vue';
import ItemGrid from '@/components/item/grid/index.vue';
import ItemSwiper from '@/components/item/swiper/index.vue';

const props = defineProps({
  data: { type: Array, required: true },
  block: { type: Object, required: true }
});

const uiTypeToComponentMap = {
  GRID: ItemGrid,
  SWIPER: ItemSwiper
};

const is = computed(() => uiTypeToComponentMap[props.block.options.uiType]);
</script>

<template>
  <component :is="is" :items="props.data" />
</template>
