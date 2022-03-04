<script>
export default { name: 'HomeBlocksFieldNumber' };
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Number || undefined, required: true },
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
  <dsp-form-control v-model.number="value" type="number" :label="label" />
</template>
