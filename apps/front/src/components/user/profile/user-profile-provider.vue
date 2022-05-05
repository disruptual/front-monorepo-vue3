<script>
export default { name: 'UserProfileProvider' };
</script>

<script setup>
import { computed, provide } from 'vue';
import { useCurrentUser, useUserApi, useItemApi } from '@dsp/core';
import { useRoute } from 'vue-router';
import { USER_PROFILE_CONTEXT_KEY } from './user-profile-constants';

const route = useRoute();
const { findBySlugQuery } = useUserApi();
const { findAllByUserIdQuery } = useItemApi();

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

const userItemsQuery = findAllByUserIdQuery(
  computed(() => user.value?.id),
  {
    enabled: computed(() => !!user.value?.id)
  }
);

const context = {
  user,
  userItems: computed(() => userItemsQuery.data.value),
  queries: {
    user: userQuery,
    userItems: userItemsQuery
  }
};

provide(USER_PROFILE_CONTEXT_KEY, context);

const queries = [currentUserQuery, userQuery, userItemsQuery];
</script>

<template>
  <dsp-queries-loader :queries="queries">
    <slot />
  </dsp-queries-loader>
</template>
