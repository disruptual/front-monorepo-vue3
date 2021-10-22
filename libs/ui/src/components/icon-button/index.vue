<script>
export default { name: 'DspIconButton' };
</script>
<script setup>
defineProps({
  isLoading: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
  icon: { type: String, required: true }
});
</script>

<template>
  <dsp-plain-button :disabled="isLoading" v-bind="$attrs">
    <dsp-icon
      :icon="isLoading ? 'spinner' : icon"
      :size="size"
      :class="isLoading && 'dsp-icon-button--loading'"
    />
  </dsp-plain-button>
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
</style>
