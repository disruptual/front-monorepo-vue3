<script>
export default { name: 'DspDrawerContent', inheritAttrs: false };
</script>
<script setup>
import { inject, computed } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const context = inject(CONTEXT_KEYS.DRAWER);

const distance = computed(() =>
  context.value.position === 'left' ? '-100%' : '100%'
);

const overlayStyle = computed(() => {
  const { isOverlayOpened, hasOverlay, position } = context.value;

  return {
    pointerEvents: isOverlayOpened && hasOverlay ? 'auto' : 'none',
    alignment: position === 'left' ? 'flex-start' : 'flex-end',
    color: hasOverlay ? 'rgba(0,0,0,0.5)' : 'transparent'
  };
});
</script>

<template>
  <dsp-fade-transition
    :is-visible="context.isOverlayOpened"
    appear
    class="dsp-drawer"
    @click="context.close"
  >
    <dsp-slide-transition
      :distance="distance"
      class="inner"
      v-bind="$attrs"
      @click.stop
    >
      <div v-if="context.isDrawerOpened">
        <slot />
      </div>
    </dsp-slide-transition>
  </dsp-fade-transition>
</template>

<style lang="scss" scoped>
.dsp-drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-drawer);
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: v-bind('overlayStyle.color');
  pointer-events: v-bind('overlayStyle.pointerEvents');
  justify-content: v-bind('overlayStyle.alignment');

  * {
    pointer-events: auto;
  }
}

.inner {
  height: 100vh;
  background-color: var(--color-surface);
  overflow: auto;
  @include mobile-only {
    width: 100%;
  }
}
</style>
