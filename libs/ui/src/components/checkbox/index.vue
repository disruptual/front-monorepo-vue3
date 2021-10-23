<script>
export default { name: 'DspCheckbox' };
</script>

<script setup>
import { computed } from 'vue';
import { makeRandomId } from '@dsp/core';

const props = defineProps({
  label: {
    type: [String, Number],
    required: true
  },
  id: {
    type: String,
    default: () => makeRandomId(6)
  },
  modelValue: { type: null, required: true },
  disabled: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue']);

const classes = computed(() => [props.disabled && 'dsp-checkbox--disabled']);

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
  <div class="dsp-checkbox" :class="classes">
    <div class="input">
      <input
        :id="props.id"
        v-model="model"
        :disabled="props.disabled"
        type="checkbox"
        v-bind="$attrs"
      />
      <dsp-icon icon="checkbox" size="md" class="check" />
    </div>
    <label :for="id" class="label">
      <slot>{{ props.label }}</slot>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.dsp-checkbox {
  display: flex;
  flex-wrap: nowrap;
  --checkbox-color: var(--color-text);

  &:focus-within {
    --checkbox-color: var(--color-brand-500);
  }
}

.dsp-checkbox--disabled {
  .input {
    border-color: var(--color-text-disabled);
  }

  .label {
    color: var(--color-text-disabled);
  }

  .check {
    color: var(--color-disabled);
  }
}

.input {
  position: relative;
  border: solid 1px var(--checkbox-color);
  width: 1em;
  height: 1em;
  border-radius: var(--border-radius-xs);
  transition: box-shadow var(--transition-sm);
  background: var(--color-surface);
}

.label {
  flex: 1;
  margin-left: var(--spacing-sm);
}
.check {
  color: var(--checkbox-color);
  pointer-events: none;
  transform: scale(0);
  transition: all var(--transition-sm);
  width: 100% !important;
  height: 100% !important;
  cursor: pointer;
}

input {
  position: absolute;
  opacity: 0;
  margin: 0;
  width: 100%;
  height: 100%;

  &:checked ~ .check {
    transform: scale(1.2) translate(-0.5px, -0.5px);
  }
}
</style>
