<script>
export default { name: 'App' };
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQueryClient } from 'vue-query';
import { AppProvider, useHttp } from '@dsp/core';
import AppLoading from 'client/components/app-loader.vue';
import { VueQueryDevTools } from 'vue-query/devtools';

// import { DisruptualDevtools } from '@dsp/devtools';

const isNavigating = ref(false);
const shouldAnimate = ref(true);
const { beforeEach } = useRouter();
beforeEach((from, to) => {
  shouldAnimate.value = from.name !== to.name;
});

const isReady = ref(false);
const http = useHttp();
const queryClient = useQueryClient();

const queries = [
  queryClient.prefetchInfiniteQuery('/categories?', () =>
    http.get('/categories')
  ),
  queryClient.prefetchInfiniteQuery('/carousels', () => http.get('/carousels')),
  queryClient.prefetchInfiniteQuery('/blocs?', () => http.get('/blocs?'))
];
Promise.all(queries).then(() => {
  // This is normally done in the onSuccess default callback from useQuery
  // However this callback is not called when using queryClient.preloadQuery
  // // @FIXME find a better way to handle this ?
  const categories = queryClient.getQueryData('/categories?');
  categories.pages.forEach(page => {
    page['hydra:member'].forEach(category => {
      queryClient.setQueryData(category['@id'], category);
    });
  });

  isReady.value = true;
});
</script>

<template>
  <AppProvider>
    <template #loading>
      <AppLoading />
    </template>

    <VueQueryDevTools />
    <dsp-toasts-container />

    <AppLoading v-if="!isReady" />
    <component :is="$route?.meta.layout || 'div'" v-else>
      <router-view v-slot="{ Component, route }">
        <div class="view-container">
          <transition
            name="router-slide"
            @before-enter="isNavigatig = false"
            @after-leave="isNavigating = false"
          >
            <div :key="route.path" :class="shouldAnimate && 'route--animated'">
              <component :is="Component" />
            </div>
          </transition>
        </div>
      </router-view>
    </component>
  </AppProvider>
  <!-- <DisruptualDevtools /> -->
</template>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.view-container {
  display: grid;
  width: var(--100-vw);
  max-width: 100%;
  height: 100%;
  overflow-x: v-bind("isNavigating ? 'hidden': 'visible'");

  > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.route--animated {
  &.router-slide-enter-from,
  &.router-slide-enter-active,
  &.router-slide-leave-active,
  &.router-slide-leave-to {
    @include mobile-only {
      transition: all var(--transition-sm);
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

a {
  color: inherit;
  text-decoration: none;
}
</style>
