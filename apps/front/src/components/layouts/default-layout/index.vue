<script>
export default { name: 'DefaultLayout' };
</script>
<script setup>
import DefaultLayoutHeader from './header/index.vue';
import DefaultLayoutFooter from './footer/index.vue';
import { ref } from 'vue';
import { vOnResize, useCssVar, useDevice } from '@dsp/ui';

const device = useDevice();
const headerHeight = ref(null);

useCssVar('--header-height', headerHeight);

const onHeaderResize = entries => {
  for (let entry of entries) {
    headerHeight.value = `${entry.target.offsetHeight}px`;
  }
};
</script>

<template>
  <div class="default-layout">
    <div v-on-resize="onHeaderResize" class="header-wrapper">
      <DefaultLayoutHeader />
    </div>
    <main><slot /></main>

    <div class="footer">
      <DefaultLayoutFooter />
    </div>

    <nav v-if="device.isMobile" class="app-bar">AppBar</nav>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  > main {
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
  }
}

.header-wrapper {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
}

.app-bar {
  position: sticky;
  bottom: 0;
  background: var(--color-surface);
  padding: var(--spacing-sm);
}
</style>
