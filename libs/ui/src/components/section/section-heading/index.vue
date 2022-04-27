<script>
export default { name: 'DspSectionHeading' };
</script>

<script setup>
import { inject, computed } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const sectionLevel = inject(CONTEXT_KEYS.SECTION, 1);
const is = computed(() => `h${sectionLevel}`);
</script>

<template>
  <component :is="is">
    <slot />
  </component>
</template>
