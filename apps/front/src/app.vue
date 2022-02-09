<script>
export default { name: 'App' };
</script>

<script setup>
import { AppProvider } from '@dsp/core';
import AppLoading from 'client/components/app-loader.vue';
// import { VueQueryDevTools } from 'vue-query/devtools';
import { DisruptualDevtools } from '@dsp/devtools';
</script>

<template>
  <AppProvider>
    <template #loading>
      <AppLoading />
    </template>

    <!-- <VueQueryDevTools /> -->
    <dsp-toasts-container />

    <component :is="$route?.meta.layout || 'div'">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </component>
  </AppProvider>
  <DisruptualDevtools />
</template>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
