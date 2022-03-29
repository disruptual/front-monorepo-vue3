<script>
export default { name: 'ItemFiltersBrand' };
</script>

<script setup>
import { inject, computed, ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import { useBrandApi } from '@dsp/core';
import { CONTEXT_KEYS } from '@dsp/ui';

const search = ref(null);
const debouncedSearch = debounce(val => {
  search.value = val;
}, 200);
const searchVModel = computed({
  get() {
    return search.value;
  },
  set: debouncedSearch
});

const query = useBrandApi().findAllQuery({
  filters: computed(() => ({ name: search.value }))
});
const { data: brands, dataById: brandsById } = query;
const { filters, setFilter } = inject(CONTEXT_KEYS.FILTER_BAR);

const vModel = computed({
  get() {
    return filters.value?.['brand.id'].value;
  },
  set(val) {
    setFilter('brand.id', val);
  }
});
</script>

<template>
  <dsp-filter-bar-item
    v-slot="{ infiniteScrollRoot }"
    label="Marque"
    name="brand.id"
    multiple
  >
    <dsp-input-search
      v-model="searchVModel"
      class="item-filters-brand__search-input"
      placeholder="Rechercher une marque"
      aria-label="rechercher une marque"
    />
    <dsp-infinite-query-loader :query="query" :root="infiniteScrollRoot">
      <ul class="item-filters-brand">
        <li v-for="brand in brands" :key="brand.id">
          <dsp-checkbox
            v-model="vModel"
            :label="brand.name"
            :value="brand.id"
          />
        </li>
      </ul>
    </dsp-infinite-query-loader>
  </dsp-filter-bar-item>
</template>

<style lang="scss" scoped>
.item-filters-brand {
  li {
    border-bottom: solid 1px var(--color-separator);
    padding: var(--spacing-sm);
  }
}

.item-filters-brand__search-input {
  margin-bottom: var(--spacing-md);
}
</style>
