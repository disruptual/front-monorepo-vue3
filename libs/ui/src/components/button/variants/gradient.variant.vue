<script>
export default { name: 'DspButtonGradient' };
</script>

<script setup>
import { useButton } from './index';
import schema from '../index.schema';

const props = defineProps({
  isFullWidth: { type: Boolean, default: false },
  isOutlined: { type: Boolean, default: false },
  ...schema.toVariantProps()
});

const classes = useButton(props, schema);
</script>

<template>
  <button class="dsp-button" :class="classes">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.dsp-button {
  background: linear-gradient(
    130deg,
    var(--color-brand-300),
    var(--color-primary)
  );
  color: var(--color-text-lighter);
  padding: 1em;
  border: solid 1px transparent;
  cursor: pointer;
  font-weight: var(--font-weight-xl);

  &.is-fullwidth {
    display: block;
    width: 100%;
  }

  &.is-outlined {
    color: black;
    border-color: black;
    background-color: transparent;
  }

  &.is-rounded {
    border-radius: 10px;
  }
}
</style>
