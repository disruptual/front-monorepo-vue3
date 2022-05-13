<script>
export default { name: 'DspSwitch' };
</script>

<script setup>
import { computed } from 'vue';
import { makeRandomId } from '@dsp/core';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [Boolean, null],
    required: true
  },
  id: { type: String, default: () => makeRandomId(6) },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' }
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});
</script>

<template>
  <div class="dsp-switch-container">
    <dsp-visually-hidden>
      <input
        :id="id"
        v-model="model"
        type="checkbox"
        class="input"
        v-bind="$attrs"
        :disabled="disabled"
      />
    </dsp-visually-hidden>

    <dsp-flex as="label" gap="sm" align="center" :for="id">
      <slot>
        {{ props.label }}
      </slot>
      <div class="dsp-switch" />
    </dsp-flex>
  </div>
</template>

<style lang="scss" scoped>
.dsp-switch {
  --dsp-switch-slider-left: 0;
  position: relative;
  width: 3rem;
  height: 1.5rem;
  border-radius: var(--border-radius-pill);
  background-color: var(--color-separator);
  display: flex;
  align-items: center;
  transition: background-color var(--transition-md);
  border: solid 3px transparent;
  cursor: pointer;

  &:hover {
    border-color: var(--color-brand-500);
  }

  &::after {
    --size: 1rem;
    content: '';
    margin: 2px;
    position: absolute;
    width: var(--size);
    height: var(--size);
    background-color: var(--color-surface);
    left: var(--dsp-switch-slider-left);
    border-radius: var(--border-radius-circle);
    transition: left var(--transition-md);
  }
}

.input:checked + label .dsp-switch {
  background: var(--color-brand-500);
  --dsp-switch-slider-left: calc(3rem - 9px - 1rem);
}

.input:disabled + label .dsp-switch {
  background: var(--color-disabled);
  cursor: default;
}

.input:focus + label .dsp-switch {
  border-color: var(--color-brand-600);
}
</style>
