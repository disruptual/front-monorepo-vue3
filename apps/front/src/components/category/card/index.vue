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
    <dsp-flex direction="column" align="center" gap="xxs">
      <span>
        {{ props.category.name }}
      </span>
      <span class="category-root">
        {{ props.category.root.name }}
      </span>
      <span>( {{ props.category.totalOfPublishedItems }} )</span>
    </dsp-flex>
  </router-link>
</template>

<style lang="scss" scoped>
.category-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px currentColor;
  padding: var(--spacing-xs);
  font-size: var(--font-size-md);
  height: 100%;
  min-width: 8em;
}

.category-root {
  font-size: var(--font-size-sm);
}
</style>
