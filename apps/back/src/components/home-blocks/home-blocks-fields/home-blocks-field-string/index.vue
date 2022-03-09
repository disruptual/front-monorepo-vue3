<script>
export default { name: 'HomeBlocksFieldString' };
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: undefined },
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
    v-slot="{ on, ...formControlProps }"
    v-model="value"
    :label="label"
  >
    <dsp-input-text v-bind="formControlProps" spellcheck="true" v-on="on" />
  </dsp-form-control>
</template>
