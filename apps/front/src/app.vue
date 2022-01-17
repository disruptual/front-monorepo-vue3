<script>
export default { name: 'App' };
</script>

<script setup>
import { AppProvider } from '@dsp/core';
import AppLoading from 'client/components/app-loader.vue';
</script>

<template>
  <AppProvider>
    <template #loading>
      <AppLoading />
    </template>

    <keep-alive>
      <component :is="$route?.meta.layout">
        <router-view />
      </component>
    </keep-alive>
  </AppProvider>
</template>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
