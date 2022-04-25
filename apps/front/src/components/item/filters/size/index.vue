<script>
export default { name: 'ItemFiltersSize' };
</script>

<script setup>
import { inject, computed, watch } from 'vue';
import { groupBy } from 'lodash-es';
import { useSizeApi, useCategoryApi } from '@dsp/core';
import { CONTEXT_KEYS, vReadableColor } from '@dsp/ui';

const { dataById: categoriesById } = useCategoryApi().findAllQuery();
const sizeQuery = useSizeApi().findAllQuery();
const { dataByUri: sizesByUri, dataById: sizesById } = sizeQuery;
const { filters, setFilter } = inject(CONTEXT_KEYS.FILTER_BAR);

const vModel = computed({
  get() {
    return filters.value?.['size.id']?.value;
  },
  set(val) {
    setFilter('size.id', val);
  }
});

const categoryFilter = computed(() => {
  const id = filters.value.itemSimilarWithCategoryId?.value?.[0];

  return categoriesById.value?.[id];
});

const removeIrrelevantSizes = category => {
  if (!vModel.value) return;

  vModel.value = vModel.value.filter(sizeId =>
    category.sizes.includes(sizesById.value[sizeId].uri)
  );
};
watch(categoryFilter, removeIrrelevantSizes, { immediate: true });

const availableSizesByTag = computed(() => {
  const sizes = categoryFilter.value
    ? categoryFilter.value.sizes.map(uri => sizesByUri.value[uri])
    : sizes.value;

  return groupBy(sizes, 'tag');
});
</script>

<template>
  <dsp-filter-bar-item label="Taille" name="size.id" multiple>
    <div class="item-filters-size">
      <dsp-query-loader :query="sizeQuery">
        <div v-for="(sizeList, tag) in availableSizesByTag" :key="tag">
          <h3>{{ tag }}</h3>

          <dsp-grid
            as="ul"
            :columns="4"
            gap="md"
            justify="center"
            class="item-filters-size__grid"
          >
            <li v-for="size in sizeList" :key="size.id">
              <label>
                <dsp-visually-hidden>
                  <dsp-checkbox
                    v-model="vModel"
                    :label="size.name"
                    :value="size.id"
                  />
                </dsp-visually-hidden>
                <dsp-center
                  v-readable-color
                  class="item-filter-size__grid-item"
                  :class="
                    vModel.includes(size.id) &&
                    'item-filter-size__grid--selected'
                  "
                >
                  {{ size.name }}
                </dsp-center>
              </label>
            </li>
          </dsp-grid>
        </div>
      </dsp-query-loader>
    </div>
  </dsp-filter-bar-item>
</template>

<style lang="scss" scoped>
.item-filters-size {
  padding: var(--spacing-sm);
}

.item-filters-size__grid {
  li label {
    width: 100%;
    cursor: pointer;

    .item-filter-size__grid-item {
      aspect-ratio: 1;
      border: solid 1px var(--color-brand-500);
      word-break: break-all;
    }

    .item-filter-size__grid-item--selected {
      background-color: var(--color-brand-500);
    }
  }
}
</style>
