<script>
export default { name: 'DefaultLayout' };
</script>
<script setup>
import DefaultLayoutHeader from './header/index.vue';
import { ref } from 'vue';
import { vOnResize, useCssVar } from '@dsp/ui';

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
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;

  > main {
    padding-top: var(--header-height);
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
    width: 100vw;
    max-width: 100%;
  }
}

.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
}
</style>
