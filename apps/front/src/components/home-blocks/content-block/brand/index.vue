<script>
export default { name: 'HomeContentBlockBrand' };
</script>

<script setup>
import { computed } from 'vue';
import BrandGrid from '@/components/brand/grid/index.vue';
import BrandSwiper from '@/components/brand/swiper/index.vue';

const props = defineProps({
  data: { type: Array, required: true },
  block: { type: Object, required: true }
});

const uiTypeToComponentMap = {
  GRID: BrandGrid,
  SWIPER: BrandSwiper
};

const is = computed(() => uiTypeToComponentMap[props.block.options.uiType]);
</script>

<template>
  <div class="home-content-block-brand">
    <component :is="is" :brands="props.data" />
  </div>
</template>

<style lang="scss" scoped>
.home-content-block-brand {
  @include mobile-only {
    padding: 0 var(--spacing-sm);
  }
}
</style>
