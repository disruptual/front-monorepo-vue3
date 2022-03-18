<script>
export default {
  name: 'DspPlainButton'
};
</script>

<script setup>
import { noop } from '@dsp/core';

const props = defineProps({
  to: { type: [String, Object], default: null },
  buttonRef: { type: Function, default: noop },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null }
});
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :ref="buttonRef"
    class="dsp-plain-button"
    :to="to"
  >
    <slot name="left-icon">
      <dsp-icon v-if="props.leftIcon" class="icon-left" :icon="leftIcon" />
    </slot>

    <slot />

    <slot name="right-icon">
      <dsp-icon v-if="props.rightIcon" class="icon-right" :icon="rightIcon" />
    </slot>
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
  display: inline-flex;
  align-items: center;
  justify-content: center;

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

.icon-left {
  margin-right: var(--spacing-xs);
  margin-left: calc(-1 * var(--spacing-xxs));
}

.icon-right {
  margin-left: var(--spacing-xs);
  margin-right: calc(-1 * var(--spacing-xxs));
}
</style>
