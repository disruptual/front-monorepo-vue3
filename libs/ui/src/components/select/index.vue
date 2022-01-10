<script>
export default { name: 'DspSelect' };
</script>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: { type: [Object, null], required: true },
  options: { type: Array, required: true },
  multiple: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);
const refSelect = ref(null);
const valueOptions = ref(null);

const getValueOptions = () => {
  valueOptions.value = [...refSelect.value.options]
    .filter(option => option.selected)
    .map(option => option.value);
};

const replaceValueOptionsByData = () => {
  valueOptions.value.map((valueOption, index) => {
    valueOptions.value[index] = {
      ...props.options.find(model => model.id === valueOption)
    };
  });
};

const onChange = () => {
  getValueOptions();
  replaceValueOptionsByData();
  emit(
    'update:modelValue',
    props.multiple ? valueOptions.value : valueOptions.value[0]
  );
};

const isSelected = option => {
  if (!props.modelValue) return;
  if (!props.multiple) {
    return props.modelValue.name === option.name;
  }
  return props.modelValue.map(model => model.name === option.name);
};
</script>

<template>
  <select
    id="cars"
    ref="refSelect"
    name="cars"
    :multiple="multiple"
    v-bind="$attrs"
    @change="onChange"
  >
    <option
      v-for="(option, i) of options"
      :key="i"
      :value="option.id"
      :selected="isSelected(option)"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.items-container {
  :deep(.menu) {
    overflow: auto;
    max-height: var(--spacing-3xl);
  }
}
</style>
