<script>
export default { name: 'UserProfileProvider' };
</script>

<script setup>
import { computed, provide } from 'vue';
import {
  useCurrentUser,
  useUserApi,
  useItemApi,
  useReviewApi
} from '@dsp/core';

import { useRoute } from 'vue-router';
import { USER_PROFILE_CONTEXT_KEY } from './user-profile-constants';

const route = useRoute();
const { findBySlugQuery } = useUserApi();
const { findAllByUserIdQuery } = useItemApi();
const { findAllReceivedByUserIdQuery } = useReviewApi();

const currentUserQuery = useCurrentUser();
const userQuery = findBySlugQuery(
  computed(() => route.params.slug),
  {
    relations: ['mainAddress', 'reviewsReceived'],
    enabled: computed(() => !!route.params.slug)
  }
);

const user = computed(() => {
  return userQuery.data.value || currentUserQuery.data.value;
});
const myProfile = computed(() => {
  return userQuery.data.uri === currentUserQuery.data.uri;
});

const userItemsQuery = findAllByUserIdQuery(
  computed(() => user.value?.id),
  {
    enabled: computed(() => !!user.value?.id)
  }
);

const userReviewsQuery = findAllReceivedByUserIdQuery(
  computed(() => user.value?.id),
  {
    enabled: computed(() => !!user.value?.id),
    relations: ['sender']
  }
);

const context = {
  user,
  myProfile,
  userItems: computed(() => userItemsQuery.data.value),
  userReviews: computed(() => userReviewsQuery.data.value),
  queries: {
    user: userQuery,
    userItems: userItemsQuery,
    userReviews: userReviewsQuery
  }
};

provide(USER_PROFILE_CONTEXT_KEY, context);

const queries = [currentUserQuery, userQuery, userItemsQuery, userReviewsQuery];
</script>

<template>
  <dsp-queries-loader :queries="queries">
    <slot />
  </dsp-queries-loader>
</template>
