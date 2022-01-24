<script>
export default { name: 'DspButtonDefault' };
</script>

<script setup>
import { useButton } from './index';
import schema from '../index.schema';
import { vReadableColor } from '@dsp/ui/directives';
import { oneOf } from '@dsp/core';

const props = defineProps({
  isFullWidth: { type: Boolean, default: false },
  isOutlined: { type: Boolean, default: false },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null },
  size: oneOf(['sm', 'md', 'lg'], 'md'),
  colorScheme: { type: String, default: 'brand' },
  ...schema.toVariantProps()
});

const { classes, colors } = useButton(props);
</script>

<template>
  <button v-readable-color class="dsp-button" :class="classes">
    <slot name="left-icon">
      <dsp-icon v-if="props.leftIcon" class="icon-left" :icon="leftIcon" />
    </slot>
    <slot />
    <slot name="right-icon">
      <dsp-icon v-if="props.rightIcon" class="icon-right" :icon="rightIcon" />
    </slot>
  </button>
</template>

<style lang="scss" scoped>
.dsp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: solid 1px transparent;
  font-family: var(--font-body);
  user-select: none;
  text-decoration: none;
  background-color: v-bind('colors.normal');

  &:hover {
    background-color: v-bind('colors.hover');
  }

  &:focus {
    background-color: v-bind('colors.focus');
    outline: none;
  }

  &:disabled {
    background-color: var(--color-disabled);
    color: var(--color-text-disabled) !important;
    cursor: default;
  }
}

.dsp-button--sm {
  padding: var(--spacing-xxs) var(--spacing-xs);
  font-size: var(--font-size-sm);
}

.dsp-button--md {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-md);
}

.dsp-button--lg {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-lg);
}
.dsp-button--is-fullwidth {
  display: flex;
  width: 100%;
}

.dsp-button--is-outlined {
  --dsp-button-outlined-color: var(--color-text);
  color: var(--dsp-button-outlined-color);
  border-color: var(--dsp-button-outlined-color);
  background-color: transparent;

  &:hover {
    background-color: v-bind('colors.normal');
  }

  &:focus {
    background-color: v-bind('colors.hover');
  }

  &:disabled {
    --dsp-button-outlined-color: var(--color-text-disabled);
    background-color: transparent;
  }
}

.dsp-button--is-rounded {
  border-radius: var(--border-radius-pill);
  padding: var(--spacing-xs) var(--spacing-md);
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
