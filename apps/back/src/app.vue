<script>
export default { name: 'App' };
</script>

<script setup>
import { onErrorCaptured, ref } from 'vue';
import { AppProvider } from '@dsp/core';
import { useRouter } from 'vue-router';
import AppLoading from 'client/components/app-loader.vue';
// import { VueQueryDevTools } from 'vue-query/devtools';

const error = ref(null);
const errorComponent = ref(null);
const { afterEach } = useRouter();

afterEach(() => {
  error.value = null;
  errorComponent.value = null;
});

onErrorCaptured((err, component) => {
  console.error(err);
  error.value = err;
  errorComponent.value = component;
  return false;
});
</script>

<template>
  <AppProvider>
    <template #loading>
      <AppLoading />
    </template>
    <component :is="$route?.meta.layout">
      <!-- <VueQueryDevTools /> -->
      <dsp-toasts-container />
      <dsp-center v-if="error" gap="lg" class="error-boundary">
        <dsp-surface>
          <dsp-center>
            <span>Une erreur est survenue...</span>
            <pre class="error">
              <div>Component : {{ errorComponent.$options.name}} </div>
              <div>{{ error }}</div>
              <div>{{ error.stack }}</div>
            </pre>
            <router-link to="/">Retour à l'accueil</router-link>
          </dsp-center>
        </dsp-surface>
      </dsp-center>
      <router-view v-else :key="$route.path" />
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

.error-boundary {
  height: 100%;
}

.error {
  background-color: var(--color-gray-50);
  padding: var(--spacing-md);
  font-size: var(--font-size-sm);
  font-family: monospace;
}
</style>
