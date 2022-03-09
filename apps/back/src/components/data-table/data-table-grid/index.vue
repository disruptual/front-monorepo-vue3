<script>
export default { name: 'DataTableGrid' };
</script>

<script setup>
import {
  inject,
  ref,
  watch,
  nextTick,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue';
import { debounce } from 'lodash-es';
import { useEventListener } from '@dsp/ui';
import { CONTEXT_KEYS } from '@/utils/constants';

import DataTableGridRow from './data-table-grid-row/index.vue';
import DataTableGridHeader from './data-table-grid-header/index.vue';

const bodyElement = ref(null);

const {
  query: { data, fetchNextPage },
  model
} = inject(CONTEXT_KEYS.DATATABLE);
const tableElement = ref(null);

const totalWidth = ref(null);
const sortedData = computed(() => model.sortDataFn(data.value));
const updateTotalWidth = debounce(() => {
  nextTick(() => {
    totalWidth.value = model.totalWidth;
  });
}, 50);
watch(model, updateTotalWidth, { immediate: true, deep: true });
useEventListener('resize', updateTotalWidth);

watch(tableElement, () => {
  model.tableElement = tableElement.value;
});

const globalState = inject(CONTEXT_KEYS.GLOBAL_STATE);
onMounted(() => {
  if (!globalState[model.id]) return;
  if (!tableElement.value) return;

  tableElement.value.scrollTop = globalState[model.id].scrollPosition;
});

onBeforeUnmount(() => {
  globalState[model.id] = {
    scrollPosition: tableElement.value?.scrollTop
  };
});
</script>

<template>
  <table ref="tableElement" class="data-table-grid">
    <DataTableGridHeader />
    <tbody v-if="data?.length === 0">
      <tr class="no-result">
        <div>
          <slot name="no-result">
            <dsp-center>Pas de résultats.</dsp-center>
          </slot>
        </div>
      </tr>
    </tbody>

    <dsp-infinite-scroll v-else :root="tableElement" @load-more="fetchNextPage">
      <tbody ref="bodyElement">
        <DataTableGridRow
          v-for="(row, index) in sortedData"
          :key="row.id"
          :row="row"
          :index="index"
        />
      </tbody>
    </dsp-infinite-scroll>
  </table>
  <slot />
</template>

<style lang="scss" scoped>
.data-table-grid {
  border-collapse: collapse;
  display: block;
  overflow: auto;
  max-width: 100%;
  position: relative;

  tbody {
    display: block;
  }

  thead,
  tbody {
    width: v-bind('totalWidth + "px"');
  }

  tbody tr:last-of-type {
    border-bottom: solid 1px var(--color-separator);
  }
}

.no-result {
  display: block;
  display: grid;
  grid-template-columns: v-bind('model.rowTemplate');
  margin-left: auto;
  margin-right: auto;
  min-width: 100%;
  background-color: var(--color-surface);

  & > * {
    padding: var(--spacing-sm);
    grid-column: 1 / -1;
    border-left: solid 1px var(--color-separator);
    border-right: solid 1px var(--color-separator);
  }
}
</style>
