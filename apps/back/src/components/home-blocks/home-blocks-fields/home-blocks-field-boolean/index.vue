<script>
export default { name: 'HomeBlocksFieldBoolean' };
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  label: { type: String, default: 'Label' }
});
const emit = defineEmits(['update:modelValue']);

const vModal = computed({
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
    v-model="vModal"
    :label="label"
  >
    <dsp-switch v-model="vModal" v-bind="formControlProps" v-on="on" />
  </dsp-form-control>
</template>
