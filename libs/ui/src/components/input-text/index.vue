<script>
export default {
  name: 'DspInputText',
  inheritAttrs: false
};
</script>

<script setup>
import { computed } from 'vue';
import { useReadableColor } from '@dsp/ui/hooks/useReadableColor';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: String, default: null },
  leftIcon: { type: String, default: null },
  rightIcon: { type: String, default: null }
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const textColor = useReadableColor('--color-surface');
</script>

<template>
  <div class="dsp-input-text">
    <slot name="left-icon">
      <dsp-icon v-if="props.leftIcon" :icon="props.leftIcon" class="icon" />
    </slot>
    <input v-model="model" v-bind="$attrs" />

    <slot name="right-icon">
      <dsp-icon v-if="props.rightIcon" :icon="props.rightIcon" class="icon" />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.dsp-input-text {
  display: flex;
  grid-gap: var(--spacing-xs);
  background-color: var(--color-surface);
  border: solid 1px var(--color-separator);

  &:focus-within {
    border-color: var(--color-primary);
    outline: solid 1px var(--color-primary);
  }

  input {
    padding: var(--spacing-xs);
    border: none;
    background: inherit;
    flex-grow: 1;
    color: v-bind(textColor);

    &:focus {
      outline: none;
    }
  }
}

.icon {
  padding: var(--spacing-xs);
}
</style>
