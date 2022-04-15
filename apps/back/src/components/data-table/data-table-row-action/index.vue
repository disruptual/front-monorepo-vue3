<script>
export default { name: 'DataTableRowAction' };
</script>

<script setup>
import { inject, watch } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
  canBatch: { type: Boolean, default: true }
});
const emit = defineEmits(['action']);
const { model } = inject(CONTEXT_KEYS.DATATABLE);

model.addRowAction({
  label: props.label,
  icon: props.icon,
  canBatch: props.canBatch,
  action: event => {
    emit('action', event);
  }
});
</script>

<template>
  <div v-if="false" />
</template>
