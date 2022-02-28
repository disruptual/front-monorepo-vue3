<script>
export default {
  name: 'DspBackLink'
};
</script>

<script setup>
import schema from './index.schema';
import { vReadableColor } from '@dsp/ui/directives/readableColor';

defineEmits(['click']);
const props = defineProps({
  label: { type: String, required: true },
  ...schema.toProps()
});

const context = schema.toContext(props);
</script>

<template>
  <dsp-flex
    v-readable-color
    class="back-link"
    align="center"
    justify="space-between"
  >
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
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: v-bind('context.bgColor');

  > button {
    color: inherit;
  }

  .label {
    text-transform: capitalize;
  }
}
</style>
