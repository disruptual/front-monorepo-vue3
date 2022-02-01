<script>
export default { name: 'App' };
</script>

<script setup>
import { reactive, provide } from 'vue';
import { AppProvider } from '@dsp/core';
import AppLoading from 'client/components/app-loader.vue';
import ErrorBoundary from './components/error-boundary/index.vue';
import FeatureControl from './components/feature-control/index.vue';
import { CONTEXT_KEYS } from './utils/constants';
// import { VueQueryDevTools } from 'vue-query/devtools';

const globalState = reactive({});
provide(CONTEXT_KEYS.GLOBAL_STATE, globalState);
</script>

<template>
  <AppProvider>
    <template #loading>
      <AppLoading />
    </template>
    <component :is="$route?.meta.layout">
      <!-- <VueQueryDevTools /> -->
      <dsp-toasts-container />
      <ErrorBoundary>
        <FeatureControl>
          <router-view :key="$route.path" />
        </FeatureControl>
      </ErrorBoundary>
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
