<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: true },
  variants: { type: Array, required: true }
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
</script>

<template>
  <fieldset>
    <legend>Variant</legend>
    <dsp-flex gap="sm">
      <dsp-radio
        v-for="variant in props.variants"
        :key="variant"
        v-model="model"
        :value="variant"
        :label="variant"
      />
    </dsp-flex>
  </fieldset>
</template>
