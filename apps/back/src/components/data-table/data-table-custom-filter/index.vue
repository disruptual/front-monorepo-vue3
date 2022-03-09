<script>
export default { name: 'DataTableCustomFilter' };
</script>

<script setup>
import { inject, useSlots } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: [String, null], default: undefined },
  filterTag: { type: String, default: null }
});
const { model } = inject(CONTEXT_KEYS.DATATABLE);

const slots = useSlots();

model.addCustomFilter({
  name: props.name,
  label: props.label ?? props.name,
  template: slots.default,
  filterTag: props.filterTag ?? props.label
});
</script>

<template>
  <div v-if="false" />
</template>
