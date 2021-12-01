<script>
export default { name: 'DefaultLayout' };
</script>
<script setup>
import DefaultLayoutHeader from './header/index.vue';
import DefaultLayoutSidebar from './sidebar/index.vue';
import { ref } from 'vue';
import { vOnResize, useCssVar, useDevice } from '@dsp/ui';

const device = useDevice();

const headerHeight = ref(null);

// useCssVar('--header-height', headerHeight);
const onHeaderResize = entries => {
  for (let entry of entries) {
    headerHeight.value = `${entry.target.offsetHeight}px`;
  }
};

const sidebarHeight = ref(null);
useCssVar('--sidebar-height', headerHeight);
const onSidebarResize = entries => {
  for (let entry of entries) {
    sidebarHeight.value = `${entry.target.offsetHeight}px`;
  }
};
</script>

<template>
  <div class="default-layout">
    <DefaultLayoutHeader v-on-resize="onHeaderResize" class="layout__header" />
    <DefaultLayoutSidebar
      v-if="!device.isMobile"
      v-on-resize="onSidebarResize"
      class="layout__sidebar"
    />
    <main><slot /></main>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  width: 100vw;
  max-width: 100%;

  > main {
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
    grid-column: 2;

    @include mobile-only {
      grid-column: 1 / -1;
    }
  }
}

.layout__header {
  position: sticky;
  top: 0;
  z-index: 3;
  grid-column: 2;

  @include mobile-only {
    grid-column: 1 / -1;
  }
}

.layout__sidebar {
  grid-row: 1 / 3;
}
</style>
