<script>
export default { name: 'ConnectedOnlyButton' };
</script>

<script setup>
import { useRoute } from 'vue-router';
import { useCurrentUser } from '@dsp/core';

const { data: currentUser } = useCurrentUser();
const route = useRoute();
</script>

<template>
  <dsp-loading-button
    :to="!currentUser && { name: 'Login', query: { from: route.fullPath } }"
  >
    <slot />
  </dsp-loading-button>
</template>
