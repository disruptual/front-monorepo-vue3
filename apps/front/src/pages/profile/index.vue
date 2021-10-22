<script setup>
import { useCurrentUser } from '@dsp/core';

const { isLoading, data: currentUser } = useCurrentUser();
</script>

<template>
  <div>
    <h1>Profile page</h1>
    <div v-if="isLoading">Loading...</div>

    <div v-else>
      <p>Hello, {{ currentUser.firstName }}</p>
    </div>
  </div>
</template>
