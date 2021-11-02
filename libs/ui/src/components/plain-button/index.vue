<script>
export default {
  name: 'DspPlainButton'
};
</script>

<script setup>
defineProps({
  to: { type: Object, default: null }
});
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
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

  &:hover {
    color: var(--color-brand-500);
  }

  &:focus-visible {
    background-color: var(--color-brand-quarter);
    outline: none;
  }

  [disabled] {
    color: var(--color-text-disabled);
    cursor: default;
  }
}
</style>
