<script>
export default { name: 'DspDrawerCloseButton', inheritAttrs: false };
</script>
<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const context = inject(CONTEXT_KEYS.DRAWER);
</script>

<template>
  <dsp-icon-button icon="remove" size="lg" is-plain @click="context.close" />
</template>
