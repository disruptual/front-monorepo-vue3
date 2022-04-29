<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { omitBy, isNil } from 'lodash-es';
import { useItemApi, useCategoryApi, isArray, isDefined } from '@dsp/core';
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

const toArray = val => {
  if (!isDefined(val)) return null;

  return isArray(val) ? val : [val];
};

const filters = computed(() => ({
  itemSimilarWithCategoryId: [category.value?.id].filter(Boolean),
  'brand.id': toArray(route.query.brand),
  'colors.id': toArray(route.query.color),
  'size.id': toArray(route.query.size),
  'condition.id': toArray(route.query.condition),
  'price[min]': route.query.minPrice,
  'price[max]': route.query.maxPrice,
  query: route.query.search
}));

const filtersVModel = computed({
  get() {
    const { 'price[min]': min, 'price[max]': max, ...rest } = filters.value;

    return {
      ...rest,
      price: min || max ? { min, max } : null
    };
  },
  set(val) {
    const categorySlug =
      categoriesById.value[val.itemSimilarWithCategoryId?.[0]]?.slug;
    console.log(val);
    replace({
      name: 'ItemSearch',
      params: {
        category: categorySlug
      },
      query: omitBy(
        {
          brand: val['brand.id'],
          color: val['colors.id'],
          size: val['size.id'],
          condition: val['condition.id'],
          minPrice: val.price?.min,
          maxPrice: val.price?.max
        },
        isNil
      )
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
  margin: var(--spacing-md) 0;
}

.item-search-page__filters {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-xs) !important;
}
</style>
