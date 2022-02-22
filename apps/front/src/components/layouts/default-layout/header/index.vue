<script>
export default { name: 'DefaultLayoutHeader' };
</script>
<script setup>
import HeaderMenu from './menu/index.vue';
import HeaderSearchBar from './search-bar/index.vue';
import { useDevice, vReadableColor } from '@dsp/ui';
import BurgerMenu from './burger-menu/index.vue';
import HeaderAnnouncement from './announcement/index.vue';

const device = useDevice();
</script>

<template>
  <HeaderAnnouncement />
  <header class="header" justify="space-around" align="center">
    <HeaderSearchBar v-if="device.isDesktop" class="header-search-bar" />
    <dsp-flex v-else><BurgerMenu /></dsp-flex>
    <router-link :to="{ name: 'Home' }" class="logo">
      <h1 v-readable-color>DISRUPTUAL</h1>
    </router-link>
    <HeaderMenu class="menu" />
  </header>
  <HeaderSearchBar v-if="!device.isDesktop" />
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-surface);
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: var(--spacing-xs) 0;

  @include desktop-only {
    padding: var(--spacing-sm) var(--spacing-xl);
  }
}

.menu {
  justify-self: end;
}

.logo {
  height: 50px;
  justify-self: center;
}

.header-search-bar {
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
</style>
