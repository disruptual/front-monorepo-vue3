<script>
export default { name: 'HomeBlocksFields' };
</script>

<script setup>
import { computed } from 'vue';
import { HOME_BLOCK_PROPERTY_TYPES } from '@dsp/business';

import HomeBlocksFieldBoolean from './home-blocks-field-boolean/index.vue';
import HomeBlocksFieldString from './home-blocks-field-string/index.vue';
import HomeBlocksFieldNumber from './home-blocks-field-number/index.vue';
import HomeBlocksFieldColor from './home-blocks-field-color/index.vue';
import HomeBlocksFieldEnum from './home-blocks-field-enum/index.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  mappedOptions: { type: Object, required: true }
});
const emit = defineEmits(['update:modelValue']);

const block = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const hasChildren = option => {
  return option?.type === undefined;
};

const component = type => {
  switch (type) {
    case HOME_BLOCK_PROPERTY_TYPES.BOOLEAN:
      return HomeBlocksFieldBoolean;
    case HOME_BLOCK_PROPERTY_TYPES.ENUM:
      return HomeBlocksFieldEnum;
    case HOME_BLOCK_PROPERTY_TYPES.STRING:
      return HomeBlocksFieldString;
    case HOME_BLOCK_PROPERTY_TYPES.NUMBER:
      return HomeBlocksFieldNumber;
    case HOME_BLOCK_PROPERTY_TYPES.COLOR:
      return HomeBlocksFieldColor;
    default:
      return null;
  }
};
</script>

<template>
  <div v-for="(mappedOption, key) in props.mappedOptions" :key="mappedOption">
    <component
      :is="component(mappedOption.type)"
      v-if="!hasChildren(mappedOption)"
      v-model="block.options[key]"
      :label="mappedOption?.label"
      :options="mappedOption?.values"
    />
    <fieldset v-else>
      <legend>{{ mappedOption?.label }}</legend>
      <div
        v-for="(subMappedOption, subKey) in mappedOption"
        :key="subMappedOption"
      >
        <component
          :is="component(subMappedOption.type)"
          v-model="block.options[key][subKey]"
          :label="subMappedOption?.label"
          :options="subMappedOption?.values"
        />
      </div>
    </fieldset>
  </div>
</template>
