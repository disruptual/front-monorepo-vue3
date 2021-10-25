<script>
export default { name: 'DataTableGridHeader' };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { vTooltip } from '@dsp/ui';

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const columnStyle = column => {
  if (!column.isPinned) return null;

  return {
    '--pinned-column-offset': `${column.pinnedOffset}px`
  };
};
</script>

<template>
  <thead class="data-table-grid-header">
    <tr>
      <th
        v-if="model.hasSelectorColumn"
        class="selector-column column--is-pinned"
      />
      <th
        v-for="column in model.displayedColumns"
        :ref="column.headerElementRef"
        :key="column"
        v-tooltip="column.label"
        scope="col"
        :class="column.isPinned && 'column--is-pinned'"
        :style="columnStyle(column)"
      >
        <dsp-flex justify="space-between" wrap="nowrap" align="center">
          <dsp-truncated-text>{{ column.label }}</dsp-truncated-text>
          <dsp-icon-button
            icon="pin"
            class="pin-button"
            @click="column.togglePinned()"
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
    border-right: solid 1px var(--color-separator);
    text-align: left;
    position: relative;
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
  right: 0;
}
</style>
