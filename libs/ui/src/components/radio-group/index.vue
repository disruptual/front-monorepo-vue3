<script>
export default { name: 'DspRadioGroup' };
</script>
<script setup>
import { makeRandomId } from '@dsp/core';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    required: true,
    type: null
  },
  values: {
    type: Array,
    required: true,
    validator: val => val.every(x => 'label' in x && 'value' in x)
  },
  row: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: () => makeRandomId(6)
  },
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const direction = computed(() => (props.row ? 'row' : 'column'));
</script>

<template>
  <div class="dsp-radio-group">
    <fieldset>
      <dsp-flex :direction="direction" gap="xs">
        <dsp-radio
          v-for="(value, index) in props.values"
          :id="props.id + index"
          :key="props.id + index"
          v-model="model"
          :label="value.label"
          :value="value.value"
          class="radio"
          :disabled="disabled"
        />
      </dsp-flex>
    </fieldset>
  </div>
</template>

<style lang="scss" scoped>
fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.radio {
  &:not(:last-of-type) {
    margin-right: var(--spacing-md);
  }
}
</style>
