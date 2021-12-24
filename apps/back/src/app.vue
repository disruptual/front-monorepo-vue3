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
    <component :is="$route?.meta.layout">
      <router-view :key="$route.path" />
    </component>
  </AppProvider>
</template>

<style lang="scss">
* {
  /* Firefox */
  scrollbar-color: #666;
  scrollbar-width: 12px;
  /* Chrome */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: var(--color-separator);
    border-radius: 4px;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 10px;
  }
}

ul {
  list-style: none;
}
</style>
