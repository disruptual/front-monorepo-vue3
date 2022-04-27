<script>
export default { name: 'CategoryCard' };
</script>
<script setup>
import { Category, RecommendedCategory } from '@dsp/business';
import { vReadableColor } from '@dsp/ui';

const props = defineProps({
  category: { type: [Category, RecommendedCategory], required: true }
});
</script>

<template>
  <router-link
    v-readable-color
    :to="{ name: 'ItemSearch', params: { category: props.category.slug } }"
    class="category-card"
  >
    {{ props.category.name }} ({{ props.category.totalOfPublishedItems }})
  </router-link>
</template>

<style lang="scss" scoped>
.category-card {
  display: block;
  border: solid 1px currentColor;
  padding: var(--spacing-md);
}
</style>
