<script>
export default { name: 'FeatureControl' };
</script>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { isFunction, useAppContext } from '@dsp/core';

const route = useRoute();
const context = useAppContext();

const isEnabled = ref(true);

watchEffect(() => {
  const { meta } = route;
  isEnabled.value = isFunction(meta.isEnabled) ? meta.isEnabled(context) : true;
});
</script>

<template>
  <dsp-center v-if="!isEnabled" gap="md" class="feature-control">
    <dsp-surface>
      <dsp-flex direction="column" gap="md" align="center">
        <h2>Cette fonctionalité n'est pas activée sur votre plateforme.</h2>
        <p>
          Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'équipe
          technique Disruptual.
        </p>
        <router-link to="/">Retour à l'accueil</router-link>
      </dsp-flex>
    </dsp-surface>
  </dsp-center>
  <slot v-else />
</template>

<style lang="scss" scoped>
.feature-control {
  height: 100%;
}
</style>
