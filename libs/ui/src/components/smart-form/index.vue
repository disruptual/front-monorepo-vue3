<script>
export default { name: 'DspSmartForm' };
</script>

<script setup>
import { computed, provide } from 'vue';
import { useForm } from '@dsp/ui/hooks';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const props = defineProps({
  form: { type: Array, default: null },
  formOptions: { type: Object, default: () => ({}) }
});

const [ownFields, ownFormActions] = useForm(props.formOptions);

const formContext = computed(() => {
  if (props.form) {
    return { fields: props.form[0], ...props.form[1] };
  }

  return {
    fields: ownFields,
    ...ownFormActions
  };
});

provide(CONTEXT_KEYS.FORM, formContext);
</script>

<template>
  <form novalidate @submit.prevent="formContext.submit">
    <slot />
  </form>
</template>
