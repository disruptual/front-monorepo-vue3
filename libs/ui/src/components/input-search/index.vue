<script>
export default { name: 'DspInputSearch' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { nanoid } from 'nanoid';
import { oneOf } from '@dsp/core';

const props = defineProps({
  buttonPosition: oneOf(['right', 'left'], 'right'),
  modelValue: { type: String, default: '' },
  ariaLabel: { type: String, default: '' },
  id: { type: String, default: () => nanoid() }
});
defineEmits(['input', 'change']);
const value = ref(props.modelValue);

const direction = computed(() =>
  props.buttonPosition === 'right' ? 'row' : 'row-reverse'
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
    <dsp-visually-hidden>
      <label :for="props.id">
        {{ props.ariaLabel }}
      </label>
    </dsp-visually-hidden>
    <input
      :id="props.id"
      v-model="value"
      type="search"
      class="input"
      v-bind="$attrs"
      @input="$emit('input', value)"
      @keyup.enter="$emit('change', value)"
    />
    <dsp-plain-button
      aria-label="props.ariaLabel"
      @click="$emit('change', value)"
    >
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
  border: solid 1px var(--color-separator);
  transition: var(--transition-md);
  overflow: hidden;
  @include desktop-only {
    border-radius: var(--border-radius-pill);
  }

  &:focus-within {
    border-color: var(--color-brand-500);
    border-width: 2px;
  }
}

.input {
  padding: var(--spacing-xs) var(--spacing-xxs);
  display: block;
  border: none;
  outline: none;
  flex-grow: 1;
  padding-left: var(--spacing-md);
  @include desktop-only {
    border-radius: var(--border-radius-pill);
  }
}
</style>
