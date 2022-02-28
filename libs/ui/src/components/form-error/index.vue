<script>
export default { name: 'DspFormError' };
</script>

<script setup>
defineProps({
  error: { type: [String, null], required: true }
});
</script>

<template>
  <dsp-fade-transition :is-visible="!!error" appear>
    <div class="dsp-form-error">
      <dsp-icon icon="warning" />
      <span>{{ error }}</span>
    </div>
  </dsp-fade-transition>
</template>

<style lang="scss" scoped>
.dsp-form-error {
  display: flex;
  gap: var(--spacing-xs);
  color: var(--color-error-500);
}
</style>
