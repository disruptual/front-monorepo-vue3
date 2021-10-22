<script>
export default { name: 'DataTableColumn' };
</script>

<script setup>
import { inject, useSlots } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: [String, null], default: undefined },
  width: { type: String, default: '*' },
  isHidden: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
  tooltipLabel: { type: [Function, String], default: '' },
  filterable: { type: [String, Boolean], default: null }
});
const { model } = inject(CONTEXT_KEYS.DATATABLE);

const slots = useSlots();

model.addColumn({
  name: props.name,
  label: props.label ?? props.name,
  template: slots.default,
  tooltipLabel: props.tooltipLabel,
  width: props.width,
  isHidden: props.isHidden,
  isPinned: props.isPinned
});
</script>

<template>
  <div v-if="false" />
</template>
