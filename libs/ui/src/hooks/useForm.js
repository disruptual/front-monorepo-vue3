import { computed, ref, toRaw, watch } from 'vue';
import { noop } from '@dsp/core';
import { useFormField } from '@dsp/ui/hooks/useFormField';
import { VALIDATION_MODES } from '@dsp/ui/utils/constants';
import { set } from 'lodash-es';

export function useForm({
  onSubmit = noop,
  onError = noop,
  throwOnError = false,
  mode = VALIDATION_MODES.ON_SUBMIT,
  initialValues = {},
  unWrapValues = true
} = {}) {
  const fields = ref({});
  const isSubmitted = ref(false);
  const isSubmitting = ref(false);

  const register = (name, field) => {
    if (fields.value[name]) {
      return;
    }
    fields.value[name] = useFormField({
      ...field,
      name: name,
      mode: field.mode || mode,
      initialValue: field.initialValue ?? initialValues[name]
    });
  };

  const unregister = name => {
    delete fields.value[name];
  };

  const validate = async () => {
    return Promise.all(
      Object.values(fields.value).map(field => field.validate())
    );
  };

  const isValid = computed(() => {
    return Object.values(fields.value).every(field => {
      return field.isValid;
    });
  });

  const values = computed(() => {
    const result = {};
    Object.entries(fields.value).forEach(([key, field]) => {
      if (unWrapValues) {
        set(result, key, field.value);
      } else {
        result[key] = field.value;
      }
    });

    return result;
  });

  const errors = computed(() =>
    Object.fromEntries(
      Object.entries(fields.value).map(([key, field]) => [key, field.errors])
    )
  );

  const submit = async () => {
    try {
      isSubmitting.value = true;
      await validate();
      isSubmitted.value = true;
      if (!isValid.value) return;

      return await onSubmit(values.value);
    } catch (err) {
      console.error(err);
      onError(err, values.value);
      if (throwOnError) throw err;
    } finally {
      isSubmitting.value = false;
    }
  };

  const reset = () => {
    Object.values(fields.value).forEach(f => f.reset());
    isSubmitted.value = false;
  };

  return [
    fields,
    {
      register,
      unregister,
      validate,
      submit,
      reset,
      isValid,
      values,
      isSubmitting,
      isSubmitted,
      errors
    }
  ];
}
