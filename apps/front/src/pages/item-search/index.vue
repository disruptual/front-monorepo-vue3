<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useItemApi, useCategoryApi } from '@dsp/core';
import ItemFilters from '@/components/item/filters/index.vue';
import ItemGrid from '@/components/item/grid/index.vue';

const route = useRoute();
const { data: category } = useCategoryApi().findBySlugQuery(
  route.params.category
);

const filters = computed(() => ({
  itemSimilarWithCategoryId: [category.value?.id].filter(Boolean)
}));
const filtersVModel = computed({
  get() {
    return filters.value;
  },
  set(val) {
    console.log(val);
  }
});

const query = useItemApi().searchQuery(
  computed(() => ({
    filters,
    enabled: [route.params.category && category.value].every(Boolean)
  }))
);
const { data: items } = query;
</script>

<template>
  <div class="item-search-page">
    <ItemFilters v-model="filtersVModel" :count="items?.totalItems" />
    <dsp-infinite-query-loader :query="query">
      <dsp-container is-large>
        <ItemGrid :items="items" />
      </dsp-container>
    </dsp-infinite-query-loader>
  </div>
</template>

<style lang="scss" scoped>
.item-search-page {
  margin-top: var(--spacing-md);
}
</style>
