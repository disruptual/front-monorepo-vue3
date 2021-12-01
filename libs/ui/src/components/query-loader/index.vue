<script>
export default { name: 'DspQueryLoader', inheritAttrs: false };
</script>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  buffer: { type: Number, default: 350 },
  root: { type: null, default: null },
  query: { type: Object, required: true }
});

const isLoading = computed(() => {
  return props.query.isLoading.value;
});
const data = computed(() => props.query.data.value);
const error = computed(() => props.query.error.value);
</script>

<template>
  <div class="query-loader">
    <slot v-if="isLoading" name="loader">
      <dsp-flex justify="center" align="center" class="loader">
        <dsp-loader size="xl" />
      </dsp-flex>
    </slot>

    <slot v-else-if="error" name="error" :error="error">
      Oops, an error has occured.
    </slot>

    <slot v-else-if="!data" name="no-result">No Result.</slot>

    <slot v-else-if="data" :entity="data" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  padding: var(--spacing-xl);
  font-size: var(--font-size-xxl);
}
</style>
