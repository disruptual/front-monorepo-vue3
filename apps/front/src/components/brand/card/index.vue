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
  <div v-readable-color class="brand-card">
    {{ props.brand.name }} ({{ props.brand.totalOfPublishedItems }})
  </div>
</template>

<style lang="scss" scoped>
.brand-card {
  border: solid 1px currentColor;
  padding: var(--spacing-md);
}
</style>
