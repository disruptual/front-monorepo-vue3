<script>
export default { name: 'UserReview' };
</script>

<script setup>
import { Review } from '@dsp/business';
import { User } from '@dsp/business';
import Rating from '@/components/rating/index.vue';

const props = defineProps({
  review: { type: Review, required: true }
});
console.log(props.review);
</script>

<template>
  <dsp-flex gap="sm" align="center" wrap="nowrap" class="user-review">
    <dsp-center gap="xs">
      <dsp-avatar v-if="review?.sender" :user="review?.sender" size="xl" />
      <Rating :review="review" size="sm" />
    </dsp-center>
    <p class="user-review__content">{{ review.content }}</p>
    <p class="user-review__date">{{ review.formatedUpdatedAt }}</p>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.user-review {
  background: #f0f0f0;
  padding: var(--spacing-sm);
}
.user-review__content {
  width: 100%;
}
.user-review__date {
  font-size: var(--font-size-sm);
}
</style>
