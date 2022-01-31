<script>
export default { name: 'DataTableGridHeader' };
</script>

<script setup>
import { inject, ref, reactive } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { vReadableColor, vTooltip } from '@dsp/ui';

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const columnStyle = column => {
  if (!column.isPinned) return null;

  return {
    '--pinned-column-offset': `${column.pinnedOffset}px`
  };
};

const columnClasses = column => [
  column.isPinned && 'column--is-pinned',
  draggedColumn.value?.name === column.name && 'column--is-dragged'
];

const draggedColumn = ref(null);
const onDragEnter = index => {
  model.moveColumn(draggedColumn.value, index);
};

const onDragStart = column => {
  draggedColumn.value = column;
};

const onDragEnd = () => {
  draggedColumn.value = null;
};

const tableHeadElement = ref(null);
const state = reactive({
  isResizing: false,
  resizeStartX: 0,
  resizeStartWidth: 0,
  resizedColumn: null,
  totalStartWidth: null
});

const onResizeStart = (e, column) => {
  state.resizedColumn = column;

  model.columns.forEach(column => {
    if (!column.isHidden) {
      column.resize(column.headerElement.offsetWidth);
    }
  });

  state.isResizing = true;
  state.resizedColumnInitialWidth = column.width;
  state.resizeStartX = e.clientX;
  state.totalStartWidth = tableHeadElement.value.parentNode.scrollWidth;
  window.addEventListener('mouseup', onResizeEnd);
};

const onResizeEnd = () => {
  state.isResizing = false;
  state.resizedColumn = null;
  state.resizeStartWidth = 0;
  state.resizeStartX = 0;
  state.totalStartWidth = 0;
  window.removeEventListener('mouseup', onResizeEnd);
};

const onResizeMove = e => {
  if (!state.isResizing) return;

  const diff = state.resizeStartX - e.clientX;
  const newWidth = state.resizedColumnInitialWidth - diff;
  state.resizedColumn.resize(newWidth);
};
</script>

<template>
  <thead
    ref="tableHeadElement"
    v-readable-color
    class="data-table-grid-header"
    @mousemove="onResizeMove"
  >
    <tr>
      <th
        v-if="model.hasSelectorColumn"
        class="selector-column column--is-pinned"
      />
      <th
        v-for="(column, index) in model.displayedColumns"
        :ref="column.headerElementRef"
        :key="column"
        v-tooltip="column.label"
        scope="col"
        :class="columnClasses(column)"
        :style="columnStyle(column)"
        draggable="true"
        @dragstart="onDragStart(column)"
        @dragend="onDragEnd(column)"
        @dragenter="onDragEnter(index)"
      >
        <dsp-flex justify="space-between" wrap="nowrap" align="center">
          <dsp-icon-button
            icon="pin"
            class="pin-button"
            is-plain
            @click="column.togglePinned()"
          />
          <dsp-truncated-text>{{ column.label }}</dsp-truncated-text>
          <div
            class="resize-handle"
            @mousedown.prevent="onResizeStart($event, column)"
          />
        </dsp-flex>
      </th>
      <th v-if="model.rowActions.length > 0" class="column--is-pinned-right" />
    </tr>
  </thead>
</template>

<style lang="scss" scoped>
.data-table-grid-header {
  display: block;
  position: sticky;
  top: 0;
  z-index: 1;

  tr {
    display: grid;
    grid-template-columns: v-bind('model.rowTemplate');
    min-width: 100%;
    border-left: solid 1px var(--color-separator);
    border-bottom: solid 1px var(--color-separator);
    border-top: solid 1px var(--color-separator);
    margin-left: auto;
    margin-right: auto;
  }

  th {
    background-color: var(--color-surface);
    padding: var(--spacing-xs);
    padding-bottom: var(--spacing-md);
    padding-left: var(--spacing-lg);
    border-right: solid 1px var(--color-separator);
    text-align: left;
    position: relative;
    cursor: pointer;
  }
}

.selector-column {
  position: sticky !important;
  left: 0;

  > * {
    height: 100%;
  }

  &:deep(label) {
    display: none;
  }
}

.column--is-pinned {
  position: sticky !important;
  left: var(--pinned-column-offset, 0);
  background-color: inherit;
  z-index: 1;
  border-left: solid 1px var(--color-separator);

  .pin-button:deep(svg) {
    transform: rotateZ(45deg);
  }
}

.column--is-pinned-right {
  position: sticky !important;
  right: 0;
  background-color: inherit;
  border-left: solid 1px var(--color-separator);
}

.pin-button {
  position: absolute;
  top: 0;
  left: 0;
}

.resize-handle {
  margin-left: auto;
  align-self: stretch;
  width: 5px;
  border-left: solid 2px var(--color-separator);
  border-right: solid 2px var(--color-separator);
  cursor: col-resize;
}
</style>
