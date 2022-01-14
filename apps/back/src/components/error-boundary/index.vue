<script>
export default { name: 'ErrorBoundary' };
</script>

<script setup>
import { onErrorCaptured, ref } from 'vue';
import { useRouter } from 'vue-router';

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
  error.value.component = component;

  return false;
});
</script>

<template>
  <dsp-center v-if="error" gap="lg" class="error-boundary">
    <dsp-surface>
      <dsp-center>
        <span>Une erreur est survenue...</span>
        <pre class="error">
          <div>Component : {{ error.component.$options.name}} </div>
          <div>{{ error }}</div>
          <div>{{ error.stack }}</div>
        </pre>
        <router-link to="/">Retour à l'accueil</router-link>
      </dsp-center>
    </dsp-surface>
  </dsp-center>
  <slot v-else />
</template>

<style lang="scss" scoped>
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
