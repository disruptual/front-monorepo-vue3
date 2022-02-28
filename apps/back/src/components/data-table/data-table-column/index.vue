<script>
export default { name: 'DataTableColumn' };
</script>

<script setup>
import { inject, useSlots, watch } from 'vue';
import { CONTEXT_KEYS, DATATABLE_COLUMN_TYPES } from '@/utils/constants';
import { oneOf } from '@dsp/core';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: [String, null], default: undefined },
  width: { type: String, default: '*' },
  isHidden: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  tooltipLabel: { type: [Function, String], default: '' },
  isFilterable: { type: Boolean, default: false },
  filterName: { type: String, default: null },
  isHighlightable: { type: Boolean, default: false },
  highlightOptions: { type: Object, default: () => ({}) },
  type: oneOf(
    Object.values(DATATABLE_COLUMN_TYPES),
    DATATABLE_COLUMN_TYPES.STRING
  ),
  enumValues: { type: Array, default: null },
  filterTag: { type: String, default: null }
});
const { model } = inject(CONTEXT_KEYS.DATATABLE);

const slots = useSlots();
const highlightOptions = {
  predicate: props.name,
  ...props.highlightOptions
};

model.addColumn({
  name: props.name,
  type: props.type,
  label: props.label ?? props.name,
  template: slots.default,
  tooltipLabel: props.tooltipLabel,
  width: props.width,
  isHidden: props.isHidden,
  isPinned: props.isPinned,
  isFilterable: props.isFilterable,
  filterName: props.filterName,
  isHighlightable: props.isHighlightable,
  highlightOptions: highlightOptions,
  enumValues: props.enumValues,
  filterTag: props.filterTag
});

watch(
  () => props.enumValues,
  newVal => {
    const column = model.columns.find(col => col.name === props.name);

    column.enumValues = newVal;
  }
);
</script>

<template>
  <div v-if="false" />
</template>
