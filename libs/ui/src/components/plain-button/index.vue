<script>
export default {
  name: 'DspPlainButton'
};
</script>

<script setup>
import { noop } from '@dsp/core';

defineProps({
  to: { type: [String, Object], default: null },
  buttonRef: { type: Function, default: noop }
});
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :ref="buttonRef"
    class="dsp-plain-button"
    :to="to"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.dsp-plain-button {
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: inherit;
  font-family: var(--font-body);
  padding: var(--spacing-xs) var(--spacing-sm);
  color: inherit;
  text-decoration: none;

  &:not(:disabled) {
    &:hover {
      color: var(--color-brand-500);
    }

    &:focus-visible {
      background-color: var(--color-brand-100);
      outline: none;
    }
  }

  &:disabled {
    color: var(--color-text-disabled);
    cursor: default;
  }
}
</style>
