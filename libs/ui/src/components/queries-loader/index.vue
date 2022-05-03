<script>
export default { name: 'DspQueriesLoader', inheritAttrs: false };
</script>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  queries: { type: Array, required: true }
});

const isLoading = computed(() => {
  return props.queries.some(q => q.isLoading.value);
});
const error = computed(() => props.queries.some(q => q.isError.value));
const isReady = computed(() => props.queries.every(q => q.data.value));
</script>

<template>
  <slot v-if="isLoading" name="loader">
    <dsp-flex justify="center" align="center" class="loader">
      <dsp-loader size="xl" />
    </dsp-flex>
  </slot>

  <slot v-else-if="error" name="error">Oops, an error has occured.</slot>

  <slot v-else-if="isReady" />
</template>

<style lang="scss" scoped>
.loader {
  height: 100%;
  padding: var(--spacing-xl);
  font-size: var(--font-size-xxl);
}
</style>
