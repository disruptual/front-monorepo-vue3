<script>
export default { name: 'UserCard' };
</script>
<script setup>
import { User, RecommendedUser } from '@dsp/business';
import UserRating from '@/components/user/rating/index.vue';

const props = defineProps({
  user: { type: [User, RecommendedUser], required: true }
});
</script>

<template>
  <dsp-surface class="user-card">
    <dsp-center gap="xs">
      <dsp-avatar :user="props.user" size="lg" />
      <dsp-truncated-text class="user-card__name">
        {{ props.user.username }}
      </dsp-truncated-text>
      <UserRating :user="props.user" size="md" />
    </dsp-center>
    <div class="user-card__additional">
      <slot />
    </div>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.user-card {
  padding: var(--spacing-md);
}

.user-card__name {
  font-size: var(--font-size-lg);
}

.user-card__additional {
  margin-top: var(--spacing-md);
}
</style>
