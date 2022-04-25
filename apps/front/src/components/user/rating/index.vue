<script>
export default { name: 'UserRating' };
</script>

<script setup>
import { User, RecommendedUser } from '@dsp/business';

const props = defineProps({
  user: { type: [User, RecommendedUser], required: true },
  size: { type: String, default: 'md' }
});
</script>

<template>
  <dsp-flex gap="xs">
    <dsp-icon
      v-for="i in 5"
      :key="i"
      icon="starFilled"
      class="user-rating__icon"
      :data-filled="i <= props.user.ratingAverage"
      :size="props.size"
    />
  </dsp-flex>
</template>

<style lang="scss" scoped>
.user-rating__icon {
  color: var(--color-gray-500);

  &[data-filled='true'] {
    color: var(--color-orange-400);
  }
}
</style>
