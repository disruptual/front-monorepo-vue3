<script>
export default { name: 'DspSwperItem' };
</script>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const swiperContext = inject(CONTEXT_KEYS.SWIPER);
const swiperElement = ref(null);
const position = ref(0);

onMounted(() => {
  swiperContext.register({ elementRef: swiperElement });
});

const onSwipeStart = e => {
  position.value = e.clientX;
  const root = swiperContext.root.value;
  root.addEventListener('mousemove', onMouseMove);
  root.addEventListener('touchmove', onTouchMove);
  window.addEventListener('mouseup', onSwipeEnd);
  window.addEventListener('touchend', onSwipeEnd);
  window.addEventListener('touchleave', onSwipeEnd);
  window.addEventListener('touchcancel', onSwipeEnd);
};

const onSwipeMove = clientX => {
  const diff = clientX - position.value;
  swiperContext.move(diff);
  position.value = clientX;
};

const onTouchMove = e => {
  return onSwipeMove(e.touches[0].clientX);
};

const onMouseMove = e => {
  return onSwipeMove(e.clientX);
};

const onSwipeEnd = () => {
  const root = swiperContext.root.value;
  root.removeEventListener('mousemove', onSwipeMove);
  root.removeEventListener('touchmove', onSwipeMove);
  window.removeEventListener('mouseup', onSwipeEnd);
  window.removeEventListener('touchend', onSwipeEnd);
  window.removeEventListener('touchleave', onSwipeEnd);
  window.removeEventListener('touchcancel', onSwipeEnd);
};
</script>

<template>
  <div
    ref="swiperElement"
    class="dsp-swiper-item"
    @mousedown="onSwipeStart"
    @touchstart="onSwipeStart"
  >
    <slot />
  </div>
</template>

<style>
.dsp-swiper-item {
  flex-shrink: 0;
}
</style>
