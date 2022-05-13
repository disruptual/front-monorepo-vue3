<script>
export default { name: 'CartBottomPanel' };
</script>

<script setup>
import { ref } from 'vue';
import { vReadableColor } from '@dsp/ui';

const headerElement = ref(null);
</script>

<template>
  <dsp-surface class="cart-bottom-panel">
    <dsp-center
      ref="headerElement"
      v-readable-color
      direction="row"
      gap="sm"
      as="header"
    >
      <dsp-plain-button>Toggle</dsp-plain-button>
      <dsp-icon icon="chevronUp" />
    </dsp-center>
    <div>Content</div>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.cart-bottom-panel {
  position: fixed;
  width: 100%;
  padding: 0;
  bottom: 0;
  left: 0;

  > header {
    background-color: var(--color-brand-500);
  }
}
</style>
