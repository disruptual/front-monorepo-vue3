<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useItemApi, useCategoryApi } from '@dsp/core';
import ItemFilters from '@/components/item/filters/index.vue';
import ItemGrid from '@/components/item/grid/index.vue';

const route = useRoute();
const { replace } = useRouter();
const { dataById: categoriesById } = useCategoryApi().findAllQuery();
const { data: category } = useCategoryApi().findBySlugQuery(
  route.params.category,
  computed(() => ({
    enabled: !!route.params.category
  }))
);

const filters = computed(() => ({
  itemSimilarWithCategoryId: [category.value?.id].filter(Boolean)
}));
const filtersVModel = computed({
  get() {
    return filters.value;
  },
  set(val) {
    const categorySlug =
      categoriesById.value[val.itemSimilarWithCategoryId?.[0]]?.slug;
    replace({
      name: 'ItemSearch',
      params: {
        category: categorySlug
      }
    });
  }
});

const query = useItemApi().searchQuery(
  computed(() => ({
    filters,
    relations: ['user', 'category', 'brand'],
    enabled: [route.params.category ? category.value : true].every(Boolean)
  }))
);
const { data: items } = query;
</script>

<template>
  <div class="item-search-page">
    <dsp-surface class="item-search-page__filters">
      <dsp-container is-large>
        <ItemFilters v-model="filtersVModel" :count="items?.totalItems" />
      </dsp-container>
    </dsp-surface>

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

.item-search-page__filters {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-xs) !important;
}
</style>
