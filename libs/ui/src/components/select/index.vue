<script>
export default { name: 'DspSelect' };
</script>

<script setup>
import { computed } from 'vue';
import { makeRandomId } from '@dsp/core';

const props = defineProps({
  modelValue: { type: null, required: true },
  options: { type: Array, required: true },
  multiple: { type: Boolean, default: false },
  name: {
    type: String,
    default: () => makeRandomId(6)
  }
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});
</script>

<template>
  <select
    v-model="model"
    class="dsp-select"
    :name="props.name"
    :multiple="multiple"
    v-bind="$attrs"
  >
    <option :value="null">Selectionnez</option>
    <option v-for="(option, i) in options" :key="i" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.dsp-select {
  padding: var(--spacing-xs);
  border: solid 1px var(--color-separator);
  background-color: var(--collr-surface);
}
</style>
