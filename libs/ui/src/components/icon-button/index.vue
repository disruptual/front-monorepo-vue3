<script>
export default { name: 'DspIconButton' };
</script>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  isRounded: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
  icon: { type: String, required: true },
  isPlain: { type: Boolean, default: false }
});

const is = computed(() => (props.isPlain ? 'dsp-plain-button' : 'dsp-button'));
</script>

<template>
  <component
    :is="is"
    :disabled="isLoading"
    v-bind="$attrs"
    :class="isRounded && 'dsp-icon-button--rounded'"
  >
    <dsp-icon
      :icon="isLoading ? 'spinner' : icon"
      :size="size"
      :class="isLoading && 'dsp-icon-button--loading'"
    />
  </component>
</template>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(1turn);
  }
}

.dsp-icon-button--loading {
  animation: spin 1s infinite;
}

.dsp-icon-button--rounded {
  border-radius: 50%;
}
</style>
