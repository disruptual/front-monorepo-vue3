<script>
export default { name: 'ItemDetailsDressing' };
</script>

<script setup>
import ItemGrid from '../../grid/index.vue';
import { useItemDetails } from '../use-item-details';
const { sellerItems } = useItemDetails();
</script>

<template>
  <dsp-section>
    <dsp-section-heading class="title">
      Sa boutique
      <span>({{ sellerItems.totalItems }} articles)</span>
    </dsp-section-heading>
    <ItemGrid :items="sellerItems" />
    <dsp-center>
      <dsp-button style="width: 12rem">Voir tout</dsp-button>
    </dsp-center>
  </dsp-section>
</template>

<style lang="scss" scoped>
.title {
  margin: 0;

  @include mobile-only {
    margin-top: var(--spacing-md);
  }

  span {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xs);
  }
}
</style>
