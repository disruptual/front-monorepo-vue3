<script>
export default { name: 'DataTable' };
</script>

<script setup>
import { computed, provide, reactive, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { CONTEXT_KEYS } from '@/utils/constants';
import { DataTable } from '@/models/DataTable.model';
import { KEYBOARD, isNumber } from '@dsp/core';
import { vTooltip, useEventListener, useResizeObserver } from '@dsp/ui';

import DataTableGrid from './data-table-grid/index.vue';
import DataTableActionBar from './data-table-action-bar/index.vue';

const props = defineProps({
  query: { type: Object, required: true },
  minRowSize: { type: Number, default: 40 },
  hasActionBar: { type: Boolean, default: true },
  hasSelectorColumn: { type: Boolean, default: true },
  hasSearchbar: { type: Boolean, default: false },
  rowDetailTarget: { type: Function, default: null },
  id: { type: String, required: true },
  sortDataFn: {
    type: Function,
    default: data => data
  }
});
const emit = defineEmits(['rowDblClick', 'filterChange']);

const isLoading = computed(() => props.query.isLoadingFirstPage.value);
const { t } = useI18n();

const navigate = row => props.rowDetailTarget(row);

const model = reactive(
  new DataTable({
    id: props.id,
    query: props.query,
    minRowSize: props.minRowSize,
    hasSelectorColumn: props.hasSelectorColumn,
    hasSearchbar: props.hasSearchbar,
    onGoToDetail: props.rowDetailTarget && navigate,
    sortDataFn: props.sortDataFn,
    onFilterChange(filters) {
      emit('filterChange', filters);
    }
  })
);

useEventListener('keydown', e => {
  if (!isNumber(model.focusedRowIndex)) return;

  switch (e.key) {
    case KEYBOARD.ARROW_DOWN:
      if (model.focusedRowIndex === props.query.data?.length) return;
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

const rootElement = ref(null);
const tableWidth = ref('100%');

const setTableWidth = () => {
  requestAnimationFrame(() => {
    const { parentNode } = rootElement.value;

    parentNode.style.overflow = 'hidden';
    tableWidth.value = `${parentNode.offsetWidth - 2}px`;
    parentNode.style.removeProperty('overflow');
  });
};
useResizeObserver('main', setTableWidth);
onMounted(setTableWidth);

provide(CONTEXT_KEYS.DATATABLE, {
  query: props.query,
  model
});
</script>

<template>
  <div ref="rootElement" class="data-table">
    <dsp-flex v-if="isLoading" justify="center" class="loader">
      <dsp-loader />
    </dsp-flex>
    <slot
      v-else-if="props.query.isError.value"
      :error="props.query.error"
      name="error"
    >
      <dsp-center>
        {{ t('dataTable.loadingError') }}
      </dsp-center>
    </slot>
    <template v-else>
      <DataTableActionBar v-if="props.hasActionBar" />

      <DataTableGrid>
        <template #no-result><slot name="no-result" /></template>
      </DataTableGrid>
      <div class="reset-preferences">
        <dsp-button
          v-tooltip="t('dataTable.actions.resetPreferences')"
          @click="model.resetPreferences"
        >
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
  overflow: hidden;
  max-width: v-bind(tableWidth);
  display: flex;
  flex-direction: column;
  /* grid-template-rows: auto 1fr; */

  table {
    max-width: v-bind(tableWidth);
  }

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
