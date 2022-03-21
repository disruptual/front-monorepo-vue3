<script>
export default { name: 'BrandSwiper' };
</script>
<script setup>
import BrandCard from '@/components/brand/card/index.vue';

defineProps({
  brands: { type: Array, required: true }
});
</script>

<template>
  <dsp-swiper gap="md" class="brand-swiper" has-fade>
    <dsp-swiper-item v-for="brand in brands" :key="brand.id">
      <BrandCard :brand="brand" class="brand-swiper__card" />
    </dsp-swiper-item>
  </dsp-swiper>
</template>

<style lang="scss" scoped></style>
