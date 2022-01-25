<script>
export default { name: 'DataTableGrid' };
</script>

<script setup>
import { inject, computed, ref, watch } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { vOnIntersect, vTooltip } from '@dsp/ui';

import DataTableActionsDropdown from '@/components/data-table/data-table-actions-dropdown/index.vue';

const props = defineProps({
  row: { type: Object, required: true },
  index: { type: Number, required: true }
});

const { model } = inject(CONTEXT_KEYS.DATATABLE);
const isVisible = ref(false);
const rowElement = ref(null);

const intersectOptions = {
  rootMargin: '300px'
};

const onIntersect = entry => {
  isVisible.value = entry.isIntersecting;
};

const columnStyle = column => {
  if (!column.isPinned) return null;
  return {
    '--pinned-column-offset': `${column.pinnedOffset}px`
  };
};

const isSelected = computed(() => model.selectedRowIds.includes(props.row.id));
const highlight = computed(() => model.getRowHighlight(props.row));
const isHighlighted = computed(() => !!highlight.value);

watch(
  () => model.focusedRowIndex,
  () => {
    if (model.focusedRowIndex === props.index) {
      rowElement.value?.focus();
    }
  }
);
</script>

<template>
  <tr
    ref="rowElement"
    v-on-intersect:[intersectOptions]="onIntersect"
    class="data-table-grid-row"
    :class="[
      isSelected && 'data-table-grid-row--selected',
      isHighlighted && 'data-table-grid-row--highlighted'
    ]"
    tabIndex="0"
    @dblclick="model.onGoToDetail(row)"
    @focus="model.focusedRowIndex = index"
    @keyup.enter="model.onRowDblClick(row, $event)"
  >
    <template v-if="isVisible">
      <td
        v-if="model.hasSelectorColumn"
        as="td"
        class="selector-column column--is-pinned"
        @click.stop
      >
        <dsp-checkbox
          v-model="model.selectedRowIds"
          :value="row.id"
          :label="row.id"
        />
      </td>
      <td
        v-for="column in model.displayedColumns"
        :key="column"
        v-tooltip="column.getTooltip(row)"
        :class="column.isPinned && 'column--is-pinned'"
        :style="columnStyle(column)"
      >
        <dsp-v-node
          v-if="column.template && row"
          :vnode="column.template"
          :value="row[column.name]"
          :row="row"
          :column="column.name"
        />
        <dsp-truncated-text v-else as="span" :has-tooltip="false">
          {{ row[column.name] }}
        </dsp-truncated-text>
      </td>
      <td
        v-if="model.hasActionColumn"
        class="column--is-pinned-right"
        @click.stop
      >
        <dsp-flex align="center" justify="center">
          <DataTableActionsDropdown :row="row" />
        </dsp-flex>
      </td>
    </template>
  </tr>
</template>

<style lang="scss" scoped>
.data-table-grid-row {
  min-height: v-bind('model.minRowSize + "px"');
  display: grid;
  grid-template-columns: v-bind('model.rowTemplate');
  min-width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-left: solid 1px var(--color-separator);

  &:focus,
  &:focus-within {
    outline: none;

    td {
      background-color: var(--color-brand-200) !important;
    }
  }

  &:nth-of-type(even) td {
    background: var(--color-background);
  }

  td {
    background: var(--color-surface);
    padding: var(--spacing-xs);
    border-right: solid 1px var(--color-separator);
    display: flex;
    align-items: center;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.data-table-grid-row--selected td {
    background-color: var(--color-brand-100);
  }
  &.data-table-grid-row--highlighted td {
    background-color: v-bind('highlight?.color?.bg');
    color: v-bind('highlight?.color?.text');
  }
}

.selector-column {
  position: sticky;
  left: 0;
  display: flex !important;
  align-items: center;
  justify-content: center;

  &:deep(label) {
    display: none;
  }
}

.column--is-pinned {
  position: sticky;
  left: var(--pinned-column-offset, 0);
  background-color: inherit;
}

.column--is-pinned-right {
  position: sticky;
  right: 0;
  background-color: inherit;
  border-left: solid 1px var(--color-separator);
}
</style>
