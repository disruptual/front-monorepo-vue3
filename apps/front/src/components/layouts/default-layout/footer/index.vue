<script>
export default { name: 'DefaultLayoutFooter' };
</script>

<script setup>
import { vReadableColor, useDevice } from '@dsp/ui';

const device = useDevice();
</script>

<template>
  <footer v-readable-color class="app-footer">
    <dsp-container is-large>
      <dsp-grid :columns="4" justify="center">
        <dsp-center direction="column">
          <dsp-icon icon="user" size="xl" />
          <p>Reinsurance text 1</p>
        </dsp-center>

        <dsp-center direction="column">
          <dsp-icon icon="user" size="xl" />
          <p>Reinsurance text 2</p>
        </dsp-center>

        <dsp-center direction="column">
          <dsp-icon icon="user" size="xl" />
          <p>Reinsurance text 3</p>
        </dsp-center>

        <dsp-center direction="column">
          <dsp-icon icon="user" size="xl" />
          <p>Reinsurance text 4</p>
        </dsp-center>
      </dsp-grid>
    </dsp-container>

    <nav>
      <dsp-flex v-if="!device.isMobile" as="ul" gap="md" justify="center">
        <li>
          <router-link
            :to="{
              name: 'Cms',
              params: { slug: 'conditions-generales-dutilisation' }
            }"
          >
            CGU
          </router-link>
        </li>

        <li>
          <router-link
            :to="{
              name: 'Cms',
              params: { slug: 'donnees-personelles' }
            }"
          >
            Politique de confidentialité
          </router-link>
        </li>

        <li>
          <router-link
            :to="{
              name: 'Cms',
              params: { slug: 'mentions-legales' }
            }"
          >
            Mentions légales
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'HowItWorks' }">
            Comment ça marche ?
          </router-link>
        </li>

        <li>
          <router-link :to="{ name: 'Contact' }">Contact</router-link>
        </li>
      </dsp-flex>
    </nav>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  padding: var(--spacing-md);
  background: var(--color-brand-500);

  a {
    color: inherit;
  }
}
</style>
