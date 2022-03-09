<script>
export default { name: 'DspSmartFormSubmit' };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const props = defineProps({
  isLoading: { type: Boolean, default: null }
});
const formContext = inject(CONTEXT_KEYS.FORM);
</script>

<template>
  <dsp-loading-button
    :is-loading="props.isLoading ?? formContext.isSubmitting.value"
    v-bind="$attrs"
  >
    <slot />
  </dsp-loading-button>
</template>
