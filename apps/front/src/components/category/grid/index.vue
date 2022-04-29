<script>
export default { name: 'CategoryGrid' };
</script>
<script setup>
import CategoryCard from '@/components/category/card/index.vue';

defineProps({
  categories: { type: Array, required: true }
});
</script>

<template>
  <ul role="feed" class="category-grid">
    <li
      v-for="category in categories"
      :key="category.id"
      role="article"
      tabindex="0"
    >
      <CategoryCard :category="category" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.category-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));

  @include not-mobile {
    place-content: center;
  }

  @include mobile-only {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
  }

  > li:focus {
    outline: none;
    box-shadow: var(--box-shadow-md);
  }
}
</style>
