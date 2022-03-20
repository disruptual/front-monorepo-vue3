<script setup>
import { useCarouselApi } from '@dsp/core';

import Carousel from '@/components/carousel/index.vue';
import HomeBlocks from '@/components/home-blocks/index.vue';
const carouselQuery = useCarouselApi().findAllQuery();
</script>

<template>
  <div class="home-page">
    <dsp-query-loader :query="carouselQuery">
      <template #loader>
        <div class="carousel-loader" />
      </template>
      <template #no-result>
        <div class="carousel-loader" />
      </template>

      <template #default="{ entity: carousels }">
        <Carousel :carousel="carousels[0]" />
      </template>
    </dsp-query-loader>

    <HomeBlocks />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
}
.carousel-loader {
  animation: placeholderShimmer 1s;
  height: 320px;
}
</style>
