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

const vModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const selectOptions = computed(() =>
  props.options.map(o => ({ label: o, value: o }))
);
</script>

<template>
  <dsp-form-control
    v-slot="{ on, formControlProps }"
    v-model="vModel"
    :label="label"
  >
    <dsp-select
      v-model="vModel"
      v-bind="formControlProps"
      :options="selectOptions"
      v-on="on"
    />
  </dsp-form-control>
</template>
