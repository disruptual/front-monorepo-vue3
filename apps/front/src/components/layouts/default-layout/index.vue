<script>
export default { name: 'DefaultLayout' };
</script>
<script setup>
import { ref } from 'vue';
import { vOnResize, useCssVar, useDevice } from '@dsp/ui';
import DefaultLayoutHeader from './header/index.vue';
import DefaultLayoutFooter from './footer/index.vue';
import DefaultLayoutAppBar from './app-bar/index.vue';

const device = useDevice();
const headerHeight = ref(null);
const appBarHeight = ref(null);

useCssVar('--header-height', headerHeight);
useCssVar('--app-bar-height', appBarHeight);

const onHeaderResize = entries => {
  for (let entry of entries) {
    headerHeight.value = `${entry.target.offsetHeight}px`;
  }
};

const onAppBarResize = entries => {
  for (let entry of entries) {
    appBarHeight.value = `${entry.target.offsetHeight}px`;
  }
};
</script>

<template>
  <div class="default-layout">
    <div v-on-resize="onHeaderResize" class="default-layout__header-wrapper">
      <DefaultLayoutHeader />
    </div>
    <main><slot /></main>

    <DefaultLayoutFooter />

    <div
      v-if="device.isMobile"
      v-on-resize="onAppBarResize"
      class="default-layout__app-bar"
    >
      <DefaultLayoutAppBar />
    </div>
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

.default-layout__header-wrapper {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
}

.default-layout__app-bar {
  position: sticky;
  bottom: 0;
  z-index: 10;
}
</style>
