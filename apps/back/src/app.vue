<script>
export default { name: 'App' };
</script>

<script setup>
import { reactive, provide } from 'vue';
import { AppProvider } from '@dsp/core';
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';
import AppLoading from 'client/components/app-loader.vue';
import ErrorBoundary from './components/error-boundary/index.vue';
import FeatureControl from './components/feature-control/index.vue';
import { CONTEXT_KEYS } from './utils/constants';
import { VueQueryDevTools } from 'vue-query/devtools';
// import { DisruptualDevtools } from '@dsp/devtools';

const globalState = reactive({});
provide(CONTEXT_KEYS.GLOBAL_STATE, globalState);
const isProd = import.meta.env.PROD;
const { t } = useI18n();
useHead({
  title: `${t('platformName')} | Back-Office`
});
</script>

<template>
  <AppProvider>
    <template #loading>
      <AppLoading />
    </template>

    <component :is="$route?.meta.layout">
      <VueQueryDevTools v-if="!isProd" />
      <dsp-toasts-container />
      <ErrorBoundary>
        <FeatureControl>
          <router-view v-slot="{ Component, route }">
            <div class="view-container">
              <transition name="router-slide">
                <div :key="route.path">
                  <component :is="Component" />
                </div>
              </transition>
            </div>
          </router-view>
        </FeatureControl>
      </ErrorBoundary>
    </component>
    <!-- <DisruptualDevtools /> -->
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

.view-container {
  display: grid;
  > * {
    grid-column: 1;
    grid-row: 1;
    max-width: 100%;
    @include mobile-only {
      transition: transform var(--transition-sm);
      max-width: 100vw;
    }
  }
}

.router-slide-enter-from {
  @include mobile-only {
    transform: translateX(100%);
  }
}
.router-slide-leave-to {
  @include mobile-only {
    transform: translateX(-100%);
  }
}
</style>
