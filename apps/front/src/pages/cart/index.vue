<script setup>
import SuperCartProvider from '@/components/cart/super-cart/super-cart-provider.vue';
import { useDevice } from '@dsp/ui';

const device = useDevice();
</script>

<template>
  <dsp-section>
    <dsp-container class="super-cart-page">
      <SuperCartProvider v-slot="{ carts }">
        <dsp-flex direction="column" gap="md">
          <dsp-surface
            v-if="!device.isMobile"
            as="header"
            class="super-cart-page__header"
          >
            <dsp-flex align="center" gap="md">
              <dsp-section-heading class="super-cart-page__title">
                Panier
              </dsp-section-heading>
              <span>{{ carts?.length }} sous paniers</span>

              <dsp-plain-button
                right-icon="checkDouble"
                class="super-cart-page__select-all"
              >
                selectioner tout
              </dsp-plain-button>

              <dsp-plain-button right-icon="trash">supprimer</dsp-plain-button>
            </dsp-flex>
          </dsp-surface>

          <dsp-surface v-for="cart in carts" :key="cart.id">
            <pre>{{ cart }}</pre>
          </dsp-surface>
        </dsp-flex>

        <dsp-surface>Recap</dsp-surface>
      </SuperCartProvider>
    </dsp-container>
  </dsp-section>
</template>

<style lang="scss" scoped>
.super-cart-page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: var(--spacing-md);

  @include mobile-only {
    display: flex;
    flex-direction: column-reverse;
  }
  @include not-mobile {
    margin: var(--spacing-md) auto;
  }
}

.super-cart-page__header {
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-md);

  @include desktop-only {
    position: sticky;
    top: var(--header-height);
    z-index: 2;
  }
}

.super-cart-page__title {
  margin: 0;
}

.super-cart-page__select-all {
  margin-left: auto;
}
</style>
