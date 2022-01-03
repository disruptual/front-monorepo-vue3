<script>
export default { name: 'DspSmartFormSubmit' };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const formContext = inject(CONTEXT_KEYS.FORM);
</script>

<template>
  <dsp-loading-button
    :is-loading="formContext.isSubmitting.value"
    v-bind="$attrs"
  >
    <slot />
  </dsp-loading-button>
</template>
