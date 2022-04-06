<script>
export default { name: 'ItemFiltersCategory' };
</script>

<script setup>
import { inject, computed, ref, watch } from 'vue';
import { useCategoryApi } from '@dsp/core';
import { CONTEXT_KEYS } from '@dsp/ui';

const query = useCategoryApi().findAllQuery({
  relations: [
    {
      parent: { queryOptions: { refetchOnMount: false } },
      children: { queryOptions: { refetchOnMount: false } }
    }
  ],
  refetchOnMount: false
});
const { data, dataById: categoriesById } = query;
const { filters, setFilter } = inject(CONTEXT_KEYS.FILTER_BAR);

const selectedCategory = ref(null);
const selectCategory = id => {
  selectedCategory.value = categoriesById.value[id];
};
watch(
  () => filters.value?.itemSimilarWithCategoryId?.value,
  ([id]) => {
    selectedCategory.value = categoriesById.value[id];
  }
);

const rootCategories = computed(() => data.value?.filter(c => !c.parent));
const onBackClick = () => {
  selectedCategory.value = selectedCategory.value.parent;
};

const subCategoriesWithChildren = computed(() => {
  return selectedCategory.value
    ? selectedCategory.value.children?.filter(c => {
        return c._children?.length;
      })
    : rootCategories.value;
});

const selectableCategories = computed(() =>
  selectedCategory.value
    ? selectedCategory.value.children?.filter(c => !c._children?.length)
    : []
);

const vModel = computed({
  get() {
    return filters.value?.itemSimilarWithCategoryId?.value[0];
  },
  set(val) {
    setFilter('itemSimilarWithCategoryId', [val]);
  }
});
</script>

<template>
  <dsp-filter-bar-item label="Catégorie" name="itemSimilarWithCategoryId">
    <dsp-query-loader :query="query">
      <ul class="item-filters-category">
        <li v-if="selectedCategory">
          <dsp-plain-button left-icon="chevronLeft" @click="onBackClick">
            {{ selectedCategory.name }}
          </dsp-plain-button>
        </li>
        <li
          v-for="category in subCategoriesWithChildren"
          :key="category.id"
          class="item-filters-category__list-item"
        >
          <dsp-plain-button
            right-icon="chevronRight"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </dsp-plain-button>
        </li>
        <li
          v-if="selectedCategory"
          :key="selectedCategory.id"
          class="item-filters-category__list-item"
        >
          <dsp-radio
            v-model="vModel"
            label="Tout"
            :value="selectedCategory.id"
          />
        </li>
        <li
          v-for="category in selectableCategories"
          :key="category.id"
          class="item-filters-category__list-item"
        >
          <dsp-radio
            v-model="vModel"
            :label="category.name"
            :value="category.id"
          />
        </li>
      </ul>
    </dsp-query-loader>
  </dsp-filter-bar-item>
</template>

<style lang="scss" scoped>
.item-filters-category {
  .item-filters-category__list-item {
    border-bottom: solid 1px var(--color-separator);
    padding: var(--spacing-sm);

    button {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>
