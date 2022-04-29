<script>
export default { name: 'HomeContentBlockCategory' };
</script>

<script setup>
import { computed } from 'vue';
import CategoryGrid from '@/components/category/grid/index.vue';
import CategorySwiper from '@/components/category/swiper/index.vue';

const props = defineProps({
  data: { type: Array, required: true },
  block: { type: Object, required: true }
});

const uiTypeToComponentMap = {
  GRID: CategoryGrid,
  SWIPER: CategorySwiper
};

const is = computed(() => uiTypeToComponentMap[props.block.options.uiType]);
</script>

<template>
  <div class="home-content-block-category">
    <component :is="is" :categories="props.data" />
  </div>
</template>

<style lang="scss" scoped>
.home-content-block-category {
  @include mobile-only {
    padding: 0 var(--spacing-sm);
  }
}
</style>
