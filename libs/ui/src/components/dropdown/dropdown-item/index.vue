<script>
export default { name: 'DspDropdownItem', inheritAttrs: false };
</script>

<script setup>
import { inject } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const { close } = inject(CONTEXT_KEYS.DROPDOWN);
</script>

<template>
  <li class="dsp-dropdown-item">
    <dsp-plain-button v-bind="$attrs" @click="close">
      <slot />
    </dsp-plain-button>
  </li>
</template>

<style lang="scss" scoped>
.dsp-dropdown-item {
  > * {
    display: block;
    width: 100%;
    text-align: left;
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>
