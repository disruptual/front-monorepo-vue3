<script>
export default {
  name: 'DspInputTextarea',
  inheritAttrs: false
};
</script>

<script setup>
import { computed } from 'vue';
import { useReadableColor } from '@dsp/ui/hooks/useReadableColor';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: String, default: null },
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
    <textarea v-model="model" v-bind="$attrs"></textarea>
  </div>
</template>

<style lang="scss" scoped>
.dsp-input-text {
  display: flex;
  grid-gap: var(--spacing-xs);
  background-color: var(--color-surface);

  textarea {
    border: solid 1px var(--color-separator);
    &:focus-within {
      border-color: var(--color-brand-500);
      outline: solid 1px var(--color-brand-500);
    }
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
