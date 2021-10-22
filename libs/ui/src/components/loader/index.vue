<script>
export default { name: 'DspLoader' };
</script>

<script setup>
defineProps({
  size: { type: String, default: 'md' }
});
</script>

<template>
  <dsp-icon icon="loader" class="dsp-loader" :size="size" />
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

.dsp-loader {
  animation: spin 1s infinite;
}
</style>
