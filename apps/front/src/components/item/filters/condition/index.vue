<script>
export default { name: 'ItemFiltersCondition' };
</script>

<script setup>
import { inject, computed, ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import { useConditionApi } from '@dsp/core';
import { CONTEXT_KEYS } from '@dsp/ui';

const query = useConditionApi().findAllQuery();
const { data: conditions } = query;
const { filters, setFilter } = inject(CONTEXT_KEYS.FILTER_BAR);

const vModel = computed({
  get() {
    return filters.value?.['condition.id'].value;
  },
  set(val) {
    setFilter('condition.id', val);
  }
});
</script>

<template>
  <dsp-filter-bar-item label="Etat" name="condition.id" multiple>
    <dsp-query-loader :query="query">
      <ul class="item-filters-condition">
        <li v-for="condition in conditions" :key="condition.id">
          <dsp-checkbox
            v-model="vModel"
            :label="condition.stateName"
            :value="condition.id"
          >
            <div>{{ condition.stateName }}</div>
            <div class="item-filters-condition__description">
              {{ condition.content }}
            </div>
          </dsp-checkbox>
        </li>
      </ul>
    </dsp-query-loader>
  </dsp-filter-bar-item>
</template>

<style lang="scss" scoped>
.item-filters-condition {
  li {
    border-bottom: solid 1px var(--color-separator);
    padding: var(--spacing-sm);
  }
}

.item-filters-condition__description {
  color: var(--color-gray-500);
  font-size: var(--font-size-m);
}
</style>
