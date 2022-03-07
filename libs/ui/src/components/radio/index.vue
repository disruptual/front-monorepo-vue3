<script>
export default {
  name: 'DspRadio'
};
</script>
<script setup>
import { makeRandomId } from '@dsp/core';
defineProps({
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: () => makeRandomId(6)
  },
  modelValue: {
    type: null,
    required: true
  },
  value: { type: null, required: true }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="dsp-radio">
    <div class="input">
      <input
        :id="id"
        type="radio"
        :value="value"
        :checked="value === modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <dsp-icon icon="circleRegular" size="md" class="input__inner" />
      <dsp-icon icon="circleSolid" size="sm" class="input__inner--checked" />
    </div>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.dsp-radio {
  display: inline-flex;
  align-items: center;
}

.input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: var(--spacing-sm);

  > * {
    cursor: pointer;
  }
}

input {
  position: absolute;
  opacity: 0;
  margin: 0;

  &:focus ~ .input__inner,
  &:focus ~ .input__inner--checked {
    color: var(--color-brand-500);
  }

  &:checked ~ .input__inner--checked {
    transform: scale(0.75);
  }
}

.input_inner {
  transition: box-shadow var(--transition-md);
  border-radius: var(--border-radius-circle);
  pointer-events: none;
}

.input__inner--checked {
  pointer-events: none;
  position: absolute;
  transform: scale(0);
  transition: all var(--transition-sm);
}
</style>
