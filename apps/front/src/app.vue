<script>
export default { name: 'App' };
</script>

<script setup>
import { ref } from 'vue';
import { AppProvider } from '@dsp/core';
import AppLoading from 'client/components/app-loader.vue';
// import { VueQueryDevTools } from 'vue-query/devtools';
import { DisruptualDevtools } from '@dsp/devtools';

const isNavigating = ref(false);
</script>

<template>
  <AppProvider>
    <template #loading>
      <AppLoading />
    </template>

    <!-- <VueQueryDevTools /> -->
    <dsp-toasts-container />

    <component :is="$route?.meta.layout || 'div'">
      <router-view v-slot="{ Component, route }">
        <div class="view-container">
          <transition
            name="router-slide"
            @before-enter="isNavigating = true"
            @after-leave="isNavigating = false"
          >
            <div :key="route.path">
              <component :is="Component" />
            </div>
          </transition>
        </div>
      </router-view>
    </component>
  </AppProvider>
  <DisruptualDevtools />
</template>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.view-container {
  display: grid;
  max-width: 100vw;
  height: 100%;
  overflow-x: v-bind("isNavigating ? 'hidden': 'visible'");

  > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.router-slide-enter-from,
.router-slide-enter-active,
.router-slide-leave-active,
.router-slide-leave-to {
  @include mobile-only {
    transition: all var(--transition-sm);
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
