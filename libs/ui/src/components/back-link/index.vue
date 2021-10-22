<script>
export default {
  name: 'DspBackLink'
};
</script>

<script setup>
import schema from './index.schema';

defineEmits(['click']);
const props = defineProps({
  label: { type: String, required: true },
  ...schema.toProps()
});

const context = schema.toContext(props);
</script>

<template>
  <dsp-flex class="back-link" align="center" justify="space-between">
    <dsp-plain-button @click="$emit('click')">
      <dsp-flex align="center" gap="sm">
        <dsp-icon icon="chevronLeft" />
        <span class="label">{{ label }}</span>
      </dsp-flex>
    </dsp-plain-button>
    <slot />
  </dsp-flex>
</template>

<style lang="scss" scoped>
.back-link {
  padding: var(--spacing-sm);
  background-color: v-bind('context.bgColor');
  color: v-bind('context.color');

  > button {
    color: inherit;
  }

  .label {
    text-transform: capitalize;
  }
}
</style>
