<script>
export default { name: 'DspButtonDefault' };
</script>

<script setup>
import { useButton } from './index';
import schema from '../index.schema';

const props = defineProps({
  isFullWidth: { type: Boolean, default: false },
  isOutlined: { type: Boolean, default: false },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null },
  ...schema.toVariantProps()
});

const { classes, textColor, textHoverColor, textFocusColor } = useButton(props);
</script>

<template>
  <button class="dsp-button" :class="classes">
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
  color: v-bind(textColor);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  border: solid 1px transparent;
  font-family: var(--font-body);
  user-select: none;
  text-decoration: none;
  background-color: var(--color-brand-500);

  &:hover {
    background-color: var(--color-brand-600);
    color: v-bind(textHoverColor);
  }

  &:focus {
    background-color: var(--color-brand-700);
    color: v-bind(textFocusColor);
    outline: none;
  }

  &:disabled {
    background-color: var(--color-disabled);
    color: var(--color-text-disabled);
    cursor: default;
  }
}

.dsp-button--is-fullwidth {
  display: flex;
  width: 100%;
}

.dsp-button--is-outlined {
  color: black;
  border-color: black;
  background-color: transparent;

  &:disabled {
    background-color: transparent;
    color: var(--color-text-disabled);
    border-color: var(--color-text-disabled);
  }
}

.dsp-button--is-rounded {
  border-radius: var(--border-radius-pill);
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
