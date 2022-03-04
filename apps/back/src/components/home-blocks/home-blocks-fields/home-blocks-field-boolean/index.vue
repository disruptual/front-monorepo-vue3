<script>
export default { name: 'HomeBlocksFieldBoolean' };
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean || undefined, required: true },
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
  <dsp-form-control
    v-slot="{ on, formControlProps }"
    v-model="value"
    :label="label"
  >
    <dsp-checkbox v-model="value" v-bind="formControlProps" v-on="on" />
  </dsp-form-control>
</template>
