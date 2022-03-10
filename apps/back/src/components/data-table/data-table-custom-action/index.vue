<script>
export default { name: 'DataTableCustomAction' };
</script>

<script setup>
import { inject, useSlots } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  action: { type: Function, default: () => {} }
});
const { model } = inject(CONTEXT_KEYS.DATATABLE);

model.addCustomAction({
  icon: props.icon,
  label: props.label,
  action: props.action
});
</script>

<template>
  <div v-if="false" />
</template>
