<script>
export default { name: 'CategorySwiper' };
</script>
<script setup>
import CategoryCard from '@/components/category/card/index.vue';

defineProps({
  categories: { type: Array, required: true }
});
</script>

<template>
  <dsp-swiper gap="md" class="brand-swiper" has-controls>
    <dsp-swiper-item v-for="category in categories" :key="category.id">
      <CategoryCard :category="category" />
    </dsp-swiper-item>
  </dsp-swiper>
</template>
