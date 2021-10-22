<script>
export default { name: 'DspFormControl', inheritAttrs: false };
</script>

<script setup>
import { computed } from 'vue';
import { makeRandomId } from '@dsp/core';
import { vTooltip } from '@dsp/ui/directives/tooltip';
import { useI18n } from 'vue-i18n';
import schema from './index.schema';

defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: null, required: true },
  field: { type: Object, required: true },
  label: { type: [String, null], default: null },
  ...schema.toProps()
});
const context = schema.toContext(props);
const { t } = useI18n();

const id = makeRandomId(6);
const isRequired = computed(() =>
  Object.keys(props.field.errors).includes('required')
);
</script>

<template>
  <dsp-flex direction="column" gap="xs" class="dsp-form-control">
    <slot :id="id" name="label">
      <label v-if="label" :for="id">
        {{ label }}
        <span
          v-if="isRequired"
          v-tooltip:right="t('tooltips.formFieldIsRequired')"
        >
          *
        </span>
      </label>
    </slot>

    <slot v-bind="{ id, on: field.listeners, ...$attrs }">
      <dsp-input-text
        :id="id"
        :model-value="modelValue"
        v-bind="$attrs"
        @update:modelValue="$emit('update:modelValue', $event)"
        v-on="field.listeners"
      />
    </slot>

    <dsp-form-error
      v-for="(error, key) in field.errors"
      :key="key"
      :error="error"
    />
  </dsp-flex>
</template>

<style lang="scss" scoped>
.dsp-form-control {
  margin: var(--spacing-sm) 0;

  & > label {
    font-weight: v-bind('context.labelFontWeight');
    color: v-bind('context.labelColor');

    & > span {
      color: v-bind('context.asteriskColor');
    }
  }
}
</style>
