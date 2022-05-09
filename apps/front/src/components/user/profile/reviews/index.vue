<script>
export default { name: 'UserProfileReviews' };
</script>

<script setup>
import { computed } from 'vue';
import { useUserProfile } from '../use-user-profile';
import { useI18n } from 'vue-i18n';
import UserReview from '@/components/user/review/index.vue';
const { t } = useI18n();
const { user, userReviews, queries, myProfile } = useUserProfile();
</script>

<template>
  <dsp-section>
    <dsp-section-heading class="user-profile-reviews__heading">
      <span>
        {{ t(myProfile ? 'profile.myReviews' : 'profile.hisReviews') }}
      </span>
    </dsp-section-heading>

    <div class="user-profile-reviews__list">
      <dsp-infinite-query-loader :query="queries.userReviews">
        <template #no-results>
          {{ user.username }} Ne possède pas d'évaluations.
        </template>

        <template #default="{ data: reviews }">
          <dsp-flex direction="column" gap="md">
            <div v-for="review in reviews" :key="review.id">
              <UserReview :review="review" />
            </div>
          </dsp-flex>
        </template>
      </dsp-infinite-query-loader>
    </div>
  </dsp-section>
</template>

<style lang="scss" scoped></style>
