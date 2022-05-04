<script>
export default { name: 'BrandCard' };
</script>
<script setup>
import { Brand, RecommendedBrand } from '@dsp/business';
import { vReadableColor } from '@dsp/ui';

const props = defineProps({
  brand: { type: [Brand, RecommendedBrand], required: true }
});
</script>

<template>
  <router-link
    v-readable-color
    :to="{ name: 'ItemSearch', query: { brand: props.brand.id } }"
    class="brand-card"
  >
    {{ props.brand.name }} ( {{ props.brand.totalOfPublishedItems }} )
  </router-link>
</template>

<style lang="scss" scoped>
.brand-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px currentColor;
  padding: var(--spacing-xs);
  font-size: var(--font-size-sm);
  height: 100%;
}
</style>
