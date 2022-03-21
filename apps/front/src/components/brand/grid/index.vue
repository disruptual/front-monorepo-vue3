<script>
export default { name: 'BrandGrid' };
</script>
<script setup>
import BrandCard from '@/components/brand/card/index.vue';

defineProps({
  brands: { type: Array, required: true }
});
</script>

<template>
  <ul role="feed" class="brand-grid">
    <li v-for="brand in brands" :key="brand.id" role="article" tabindex="0">
      <BrandCard :brand="brand" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.brand-grid {
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
