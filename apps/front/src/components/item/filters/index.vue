<script>
export default { name: 'ItemFilters' };
</script>

<script setup>
defineProps({
  modelValue: { type: Object, required: true },
  count: { type: Number, default: null }
});
</script>

<template>
  <dsp-surface class="item-filters">
    <dsp-flex justify="space-between">
      <dsp-filter-bar>
        <dsp-filter-bar-item
          label="Catégorie"
          name="itemSimilarWithCategoryId"
          :model-value="modelValue.itemSimilarWithCategoryId"
        >
          Category fiter
        </dsp-filter-bar-item>
      </dsp-filter-bar>
      <div>{{ count }} résultats</div>
    </dsp-flex>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.item-filters {
  padding: var(--spacing-sm) !important;
}
</style>
