<script>
export default { name: 'DataTable' };
</script>

<script setup>
import { computed, provide, reactive, watch } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { DataTable } from '@/models/DataTable.model';

import DataTableGrid from './data-table-grid/index.vue';
import DataTableActionBar from './data-table-action-bar/index.vue';

const props = defineProps({
  query: { type: Object, required: true },
  minRowSize: { type: Number, default: 40 },
  hasActionBar: { type: Boolean, default: true },
  hasSelectorColumn: { type: Boolean, default: true }
});
const emit = defineEmits(['rowDblClick', 'filterChange']);
const isLoading = computed(
  () => props.query.isLoading.value || props.query.isRelationLoading.value
);

const model = reactive(
  new DataTable({
    query: props.query,
    minRowSize: props.minRowSize,
    hasSelectorColumn: props.hasSelectorColumn,
    onRowDblClick(row) {
      emit('rowDblClick', row);
    },
    onFilterChange(filters) {
      emit('filterChange', filters);
    }
  })
);

model.installListeners();

provide(CONTEXT_KEYS.DATATABLE, {
  query: props.query,
  model
});
</script>

<template>
  <div class="data-table">
    <dsp-flex v-if="isLoading" justify="center" class="loader">
      <dsp-loader />
    </dsp-flex>
    <template v-else>
      <DataTableActionBar v-if="props.hasActionBar" />

      <DataTableGrid>
        <template #no-result><slot name="no-result" /></template>
      </DataTableGrid>
    </template>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.data-table {
  max-height: calc(100vh - var(--header-height));
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;

  tbody tr:last-of-type {
    border-bottom: solid 1px var(--color-separator);
  }
}

.loader {
  padding: var(--spacing-xxl);
  font-size: 50px;

  @include not-desktop {
    padding: var(--spacing-xl) var(--spacing-md);
  }
}
</style>
