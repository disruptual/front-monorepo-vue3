<script>
export default { name: 'DefaultLayoutHeader' };
</script>
<script setup>
import HeaderMenu from './header-menu/index.vue';
import { useDevice } from '@dsp/ui';

const device = useDevice();
</script>

<template>
  <header class="header" justify="space-around" align="center">
    <dsp-input-search
      v-if="!device.isMobile"
      button-position="left"
      class="search-bar"
    />
    <dsp-flex v-else>
      <dsp-icon-button icon="bars" size="lg" is-plain class="burger-menu" />
    </dsp-flex>
    <router-link :to="{ name: 'Home' }" class="logo">
      <h1>DISRUPTUAL</h1>
    </router-link>
    <HeaderMenu class="menu" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-surface);
  padding: var(--spacing-sm) var(--spacing-xl);
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);

  @include mobile-only {
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}

.menu {
  justify-self: end;
}

.logo {
  height: 50px;
  justify-self: center;
}

.search-bar {
  max-width: 18em;
}

.logo {
  letter-spacing: 10px;
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  align-items: center;
  > h1 {
    font-weight: var(--font-weight-light);
    margin: 0;

    @include mobile-only {
      font-size: var(--font-size-md);
    }
  }
}

.burger-menu {
  padding: 0;
}
</style>
