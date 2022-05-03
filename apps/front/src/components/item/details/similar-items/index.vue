<script>
export default { name: 'ItemDetailsSimilarItems' };
</script>

<script setup>
import ItemSwiper from '../../swiper/index.vue';
import { useItemDetails } from '../use-item-details';
const { similarItems } = useItemDetails();
</script>

<template>
  <dsp-section v-if="similarItems.length">
    <dsp-section-heading class="title">Articles Similaires</dsp-section-heading>
    <ItemSwiper :items="similarItems" />
  </dsp-section>
</template>

<style scoped>
.title {
  margin: 0;
}
</style>
