<script>
export default { name: 'Rating' };
</script>

<script setup>
import { Review } from '@dsp/business';

defineProps({
  review: { type: Review, required: true },
  size: { type: String, default: 'md' }
});
</script>

<template>
  <dsp-flex gap="xxs" wrap="nowrap">
    <dsp-icon
      v-for="i in 5"
      :key="i"
      icon="starFilled"
      class="rating__icon"
      :data-filled="i <= review.value"
      :size="size"
    />
  </dsp-flex>
</template>

<style lang="scss" scoped>
.rating__icon {
  color: var(--color-gray-500);

  &[data-filled='true'] {
    color: var(--color-orange-400);
  }
}
</style>
