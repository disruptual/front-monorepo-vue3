<script>
export default { name: 'HomeBlocksFields' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { HOME_BLOCK_PROPERTY_TYPES } from '@dsp/business';

import HomeBlocksFieldBoolean from './home-blocks-field-boolean/index.vue';
import HomeBlocksFieldString from './home-blocks-field-string/index.vue';
import HomeBlocksFieldNumber from './home-blocks-field-number/index.vue';
import HomeBlocksFieldColor from './home-blocks-field-color/index.vue';
import HomeBlocksFieldEnum from './home-blocks-field-enum/index.vue';

const props = defineProps({
  mappedOptions: { type: Object, required: true },
  block: { type: Object, required: true }
});

const { t } = useI18n();
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
  <div v-for="(mappedOption, key) in props.mappedOptions" :key="key">
    <dsp-smart-form-field
      v-if="!hasChildren(mappedOption)"
      v-slot="slotProps"
      :name="`${props.block.id}.options.${key}`"
      :initial-value="block.options[key]"
      :required="mappedOption.type !== 'BOOLEAN'"
    >
      <component
        :is="component(mappedOption.type)"
        v-model="slotProps.field.value"
        v-bind="slotProps"
        :label="t(`homeBlocks.fields.${key}`)"
        :options="mappedOption?.values"
      />
    </dsp-smart-form-field>

    <fieldset v-else>
      <legend>{{ t(`homeBlocks.fields.${key}.legend`) }}</legend>
      <dsp-grid :columns="2" gap="sm">
        <div v-for="(subMappedOption, subKey) in mappedOption" :key="subKey">
          <dsp-smart-form-field
            v-slot="slotProps"
            :name="`${props.block.id}.options.${key}.${subKey}`"
            :initial-value="block.options?.[key]?.[subKey]"
            :required="subMappedOption.type !== 'BOOLEAN'"
          >
            <component
              :is="component(subMappedOption.type)"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t(`homeBlocks.fields.${key}.${subKey}`)"
              :options="subMappedOption?.values"
            />
          </dsp-smart-form-field>
        </div>
      </dsp-grid>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
fieldset {
  display: block;
  border: solid 1px var(--color-separator);
  /* border: none; */
  /* padding: 0; */
  margin-bottom: var(--spacing-sm);
  background: var(--color-surface);
}

legend {
  display: block;
  font-weight: var(--font-weight-bold);
}

.sub-field {
  @include not-mobile {
    padding-left: var(--spacing-lg);
  }
}
</style>
