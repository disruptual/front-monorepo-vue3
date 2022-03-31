import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { isUndefinedOrNull } from '@dsp/core';
import { VALIDATION_MODES } from '@dsp/ui/utils/constants';

export function useFormField(definition) {
  const { t } = useI18n();

  const field = reactive({
    name: definition.name,
    value: definition.initialValue ?? null,
    isDirty: false,
    isTouched: false,
    errors: Object.fromEntries(
      Object.keys(definition.validators).map(k => [k, null])
    ),
    isValid: Object.keys(definition.validators).length === 0,
    async validate() {
      const { validators } = definition;
      for (let key in validators) {
        const { handler, message, ...validatorOptions } = validators[key];
        const validationResult = await handler(field.value, validatorOptions);
        const isError = !validationResult;

        field.errors[key] = isError
          ? t(message, { value: field.value, ...validatorOptions })
          : null;
      }
      field.isValid = Object.values(field.errors).every(isUndefinedOrNull);

      return field;
    },
    reset() {
      field.isDirty = false;
      field.isTouched = false;
      field.isValid = true;
      field.errors = {};
      field.value = definition.useInitialValueOnReset
        ? definition.initialValue
        : null;
    },
    listeners: {
      input() {
        field.isTouched = true;
        if (definition.mode === VALIDATION_MODES.ON_INPUT) {
          field.validate();
        }
      },
      blur() {
        field.isDirty = true;
        if (definition.mode === VALIDATION_MODES.ON_BLUR) {
          field.validate();
        }
      },
      change() {
        field.isDirty = true;
        if (definition.mode === VALIDATION_MODES.ON_CHANGE) {
          field.validate();
        }
      }
    }
  });

  if (definition.initialValue !== undefined) {
    field.validate();
  }

  return field;
}
