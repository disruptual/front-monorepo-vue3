<script>
export default { name: 'ITemGrid' };
</script>
<script setup>
import ItemCard from '@/components/item/card/index.vue';

defineProps({
  query: { type: Object, required: true }
});
</script>

<template>
  <div>
    <dsp-infinite-query-loader
      v-slot="{ entity }"
      :query="query"
      class="item-grid"
    >
      <slot :item="entity">
        <ItemCard :item="entity" />
      </slot>
    </dsp-infinite-query-loader>
  </div>
</template>

<style lang="scss" scoped>
:deep(.item-grid) {
  --grid-size: min(14em, calc(50vw - var(--spacing-xl)));
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(var(--grid-size), 1fr));
  place-content: center;

  @include mobile-only {
    --grid-size: min(14em, calc(100vw - var(--spacing-md)));
    gap: var(--spacing-sm);
  }
}
</style>
