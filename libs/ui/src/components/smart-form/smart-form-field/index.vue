<script>
export default { name: 'DspSmartFormField' };
</script>

<script setup>
import { inject, onUnmounted, computed } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';
import { FormField } from '@dsp/ui/services/formField.builder';

const props = defineProps({
  name: { type: String, required: true },
  required: { type: Boolean, default: null },
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  minlength: { type: Number, default: null },
  maxlength: { type: Number, default: null },
  pattern: { type: RegExp, default: null },
  isIn: { type: Array, default: () => null },
  email: { type: Boolean, default: null },
  validators: { type: Array, default: () => [] },
  initialValue: { type: null, default: null },
  useInitialValueOnReset: { type: Boolean, default: true },
  mode: { type: String, default: null }
});

const formContext = inject(CONTEXT_KEYS.FORM);

const buildField = () => {
  const field = new FormField({
    initialValue: props.initialValue,
    useInitialValueOnReset: props.useInitialValueOnReset,
    mode: props.mode
  });
  if (props.required) field.required();
  if (props.min) field.min(props.min);
  if (props.max) field.max(props.max);
  if (props.minlength) field.minlength(props.minlength);
  if (props.maxlength) field.maxlength(props.maxlength);
  if (props.pattern) field.pattern(props.pattern);
  if (props.isIn) field.isIn(props.isIn);
  if (props.email) field.email();
  props.validators.forEach(({ name, ...definition }) => {
    field.validator(name, definition, formContext);
  });

  return field;
};
formContext.value.register(props.name, buildField());

onUnmounted(() => {
  formContext.value.unregister(props.name);
});

const field = computed(() => {
  return formContext.value.fields.value[props.name];
});

const slotProps = computed(() => {
  const { required, min, max, minlength, maxlength, pattern } = props;
  return {
    field: field.value,
    required,
    min,
    max,
    minlength,
    maxlength,
    pattern
  };
});
</script>

<template>
  <slot v-if="field && $slots.default" v-bind="slotProps" />
</template>
