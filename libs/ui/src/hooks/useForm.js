import { computed, ref, toRaw, watch } from 'vue';
import { noop } from '@dsp/core';
import { useFormField } from '@dsp/ui/hooks/useFormField';
import { VALIDATION_MODES } from '@dsp/ui/utils/constants';

export function useForm({
  onSubmit = noop,
  onError = noop,
  throwOnError = false,
  mode = VALIDATION_MODES.ON_SUBMIT,
  initialValues = {}
} = {}) {
  const fields = ref({});
  const isSubmitted = ref(false);
  const isSubmitting = ref(false);

  const register = (name, field) => {
    if (fields.value[name]) {
      console.warn(`the form field ${name} already exists.`);
      return;
    }

    fields.value[name] = useFormField({
      ...field,
      name: name,
      mode: field.mode || mode,
      initialValue: field.initialValue || initialValues[name]
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

  const isValid = computed(() =>
    Object.values(fields.value).every(field => field.isValid)
  );

  const values = computed(() => {
    const result = {};
    Object.entries(fields.value).forEach(([key, field]) => {
      result[key] = field.value;
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
      if (!isValid.value) return;
      isSubmitted.value = true;

      return await onSubmit(values.value);
    } catch (err) {
      console.error(err);
      onError(err);
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
