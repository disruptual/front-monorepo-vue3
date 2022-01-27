<script>
export default { name: 'DataTable' };
</script>

<script setup>
import { computed, provide, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { CONTEXT_KEYS } from '@/utils/constants';
import { DataTable } from '@/models/DataTable.model';
import { KEYBOARD, isNumber } from '@dsp/core';
import { useEventListener } from '@dsp/ui';

import DataTableGrid from './data-table-grid/index.vue';
import DataTableActionBar from './data-table-action-bar/index.vue';

const props = defineProps({
  query: { type: Object, required: true },
  minRowSize: { type: Number, default: 40 },
  hasActionBar: { type: Boolean, default: true },
  hasSelectorColumn: { type: Boolean, default: true },
  hasSearchbar: { type: Boolean, default: false },
  rowDetailTarget: { type: Function, default: null },
  id: { type: String, required: true }
});
const emit = defineEmits(['rowDblClick', 'filterChange']);

const isLoading = computed(() => props.query.isLoadingFirstPage.value);
const { push } = useRouter();

const navigate = row => {
  const target = props.rowDetailTarget(row);
  push(target);
};

const model = reactive(
  new DataTable({
    id: props.id,
    query: props.query,
    minRowSize: props.minRowSize,
    hasSelectorColumn: props.hasSelectorColumn,
    hasSearchbar: props.hasSearchbar,
    onGoToDetail: props.rowDetailTarget && navigate,
    onFilterChange(filters) {
      emit('filterChange', filters);
    }
  })
);

useEventListener('keydown', e => {
  if (!isNumber(model.focusedRowIndex)) return;

  switch (e.key) {
    case KEYBOARD.ARROW_DOWN:
      if (model.focusedRowIndex === model.currentRowCount) return;
      e.preventDefault();
      model.focusedRowIndex++;
      break;
    case KEYBOARD.ARROW_UP:
      if (model.focusedRowIndex === 0) return;
      e.preventDefault();
      model.focusedRowIndex--;
      break;
    default:
      return;
  }
});

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
      <DataTableActionBar v-if="props.hasActionBar">
        <template #custom-actions>
          <slot name="custom-actions" />
        </template>
      </DataTableActionBar>

      <DataTableGrid>
        <template #no-result><slot name="no-result" /></template>
      </DataTableGrid>
      <div class="reset-preferences">
        <dsp-button @click="model.resetPreferences">
          <dsp-icon icon="reset" />
        </dsp-button>
      </div>
    </template>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.data-table {
  max-height: calc(100vh - var(--header-height));
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

.reset-preferences {
  --offset: var(--spacing-lg);
  position: fixed;
  bottom: var(--offset);
  right: var(--offset);

  @include not-desktop {
    --offset: var(--spacing-sm);
  }
}
</style>
