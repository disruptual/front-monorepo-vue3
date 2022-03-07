<script>
export default { name: 'HomeBlocksFieldEnum' };
</script>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: { type: String, default: undefined },
  options: { type: Array, required: true },
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
    <select v-bind="formControlProps" v-on="on">
      <option disabled :value="null">{{ label }}</option>
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </dsp-form-control>
</template>
