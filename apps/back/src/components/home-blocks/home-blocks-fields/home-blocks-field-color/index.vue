<script>
export default { name: 'HomeBlocksFieldColor' };
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: undefined },
  label: { type: String, default: 'Label' }
});
const emit = defineEmits(['update:modelValue']);

const vModel = computed({
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
    v-model="vModel"
    :label="label"
  >
    <input v-model="vModel" type="color" v-bind="formControlProps" v-on="on" />
  </dsp-form-control>
</template>
