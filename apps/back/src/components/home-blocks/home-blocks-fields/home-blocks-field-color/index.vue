<script>
export default { name: 'HomeBlocksFieldColor' };
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String || undefined, required: true },
  label: { type: String, default: 'Label' }
});
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});
</script>

<template>
  <div v-if="false"></div>
</template>
