<script>
export default { name: 'DspInfiniteQueryLoader', inheritAttrs: false };
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isEnabled: { type: Boolean, default: true },
  buffer: { type: Number, default: 350 },
  root: { type: null, default: null },
  query: { type: Object, required: true }
});

const isLoadingFirstPage = computed(() => {
  return props.query.isLoadingFirstPage.value;
});
const isLoadingSubsequentPage = computed(() => {
  if (props.query.isLoadingFirstPage.value) return false;

  return props.query.isFetching.value;
});

const isIdle = computed(() => {
  return props.query.isIdle.value;
});

const data = computed(() => props.query.data.value);
const error = computed(() => props.query.error.value);

const onLoadMore = () => {
  props.query.fetchNextPage.value();
};
</script>

<template>
  <slot v-if="isIdle" name="idle" />

  <dsp-flex
    v-else-if="isLoadingFirstPage"
    justify="center"
    align="center"
    class="initial-loader"
  >
    <dsp-loader size="xl" />
  </dsp-flex>

  <slot v-else-if="data?.length === 0" name="no-results">No Results.</slot>

  <slot v-else-if="error" name="error" :error="error">
    Oops, an error has occured.
  </slot>

  <dsp-infinite-scroll
    v-else
    :root="props.root"
    :buffer="props.buffer"
    :is-enabled="props.isEnabled"
    @loadMore="onLoadMore"
  >
    <slot :data="data" />
  </dsp-infinite-scroll>

  <dsp-flex
    v-if="isLoadingSubsequentPage"
    justify="center"
    class="subsequent-loader"
  >
    <dsp-loader size="lg" />
  </dsp-flex>
</template>

<style lang="scss" scoped>
.initial-loader {
  padding: var(--spacing-xl);
  font-size: var(--font-size-xxl);
}

.subsequent-loader {
  margin: var(--spacing-xs);
}
</style>
