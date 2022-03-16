<script>
export default {
  name: 'DspInputText',
  inheritAttrs: false
};
</script>

<script setup>
import { computed } from 'vue';
import { useReadableColor } from '@dsp/ui/hooks/useReadableColor';
import { noop } from '@dsp/core';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null },
  inputRef: { type: Function, default: noop },
  readonly: { type: Boolean, default: false }
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const backgroundColor = computed(() =>
  props.readonly ? 'var(--color-gray-200)' : 'var(--color-surface)'
);
const textColor = useReadableColor('--color-surface');
</script>

<template>
  <div class="dsp-input-text">
    <slot name="left-icon">
      <div v-if="props.leftIcon" class="icon">
        <dsp-icon :icon="props.leftIcon" />
      </div>
    </slot>
    <input
      :ref="inputRef"
      v-model="model"
      v-bind="$attrs"
      :readonly="props.readonly"
    />
    <slot name="right-icon">
      <div v-if="props.rightIcon" class="icon">
        <dsp-icon :icon="props.rightIcon" />
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.dsp-input-text {
  display: flex;
  grid-gap: var(--spacing-xs);
  background-color: v-bind(backgroundColor);
  border: solid 1px var(--color-separator);

  &:focus-within {
    border-color: var(--color-brand-500);
    outline: solid 1px var(--color-brand-500);
  }

  input {
    padding: var(--spacing-xs);
    border: none;
    background: inherit;
    flex-grow: 1;
    color: v-bind(textColor);
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}

.icon {
  padding: var(--spacing-xs);
}
</style>
