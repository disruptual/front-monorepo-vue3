<script>
export default { name: 'DspInputSearch' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { oneOf } from '@dsp/core';

const props = defineProps({
  buttonPosition: oneOf(['right', 'left'], 'right')
});
defineEmits(['input', 'change']);
const value = ref('');

const direction = computed(() =>
  props.direction === 'right' ? 'row' : 'row-reverse'
);
</script>

<template>
  <dsp-flex
    class="dsp-input-search"
    justify="space-between"
    align="center"
    wrap="nowrap"
    :direction="direction"
    gap="xxs"
  >
    <input
      v-model="value"
      type="search"
      class="input"
      v-bind="$attrs"
      @input="$emit('input', value)"
      @keyup.enter="$emit('change', value)"
    />
    <dsp-plain-button @click="$emit('change', value)">
      <dsp-icon icon="search" />
    </dsp-plain-button>
  </dsp-flex>
</template>

<style lang="scss" scoped>
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
.dsp-input-search {
  background-color: var(--color-surface);
  border-radius: var(--border-radius-pill);
  border: solid 1px var(--color-separator);
  transition: var(--transition-md);
  overflow: hidden;

  &:focus-within {
    border-color: var(--color-primary);
    border-width: 2px;
  }
}

.input {
  padding: var(--spacing-xs) var(--spacing-xxs);
  border-radius: var(--border-radius-pill);
  display: block;
  border: none;
  outline: none;
  flex-grow: 1;
}
</style>
