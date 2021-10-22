<script>
export default { name: 'DspSwiper' };
</script>

<script setup>
import { reactive, ref, provide } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const state = reactive({ slides: [] });
const rootElement = ref(null);
const innerElement = ref(null);

const register = slide => {
  state.slides.push(slide);
};

const move = offset => {
  rootElement.value.scrollLeft = rootElement.value.scrollLeft - offset;
};

provide(CONTEXT_KEYS.SWIPER, { root: rootElement, register, move });
</script>

<template>
  <div ref="rootElement" class="dsp-swiper">
    <dsp-flex
      ref="innerElement"
      class="dsp-swiper__inner"
      gap="xs"
      wrap="nowrap"
      v-bind="$attrs"
    >
      <slot />
    </dsp-flex>
  </div>
</template>

<style lang="scss" scoped>
.dsp-swiper {
  overflow-x: hidden;
}

.dsp-swiper__inner {
  /* transform: translateX(var(--dsp-swiper-offset)); */
}
</style>
