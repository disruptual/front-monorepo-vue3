<script>
export default { name: 'DspSwperItem' };
</script>

<script setup>
import { inject, ref, onMounted, watch } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

defineProps({
  as: { type: String, default: 'div' }
});

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
  root.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('mouseup', onSwipeEnd);
  window.addEventListener('touchend', onSwipeEnd, { passive: true });
  window.addEventListener('touchleave', onSwipeEnd, { passive: true });
  window.addEventListener('touchcancel', onSwipeEnd, { passive: true });
};

const onSwipeMove = clientX => {
  swiperContext.onSwipeStart();

  const diff = clientX - position.value;
  // swiperContext.move(diff);
  position.value = clientX;
};

const onTouchMove = e => {
  return onSwipeMove(e.touches[0].clientX);
};

const onMouseMove = e => {
  return onSwipeMove(e.clientX);
};

const onSwipeEnd = e => {
  const root = swiperContext.root.value;
  root.removeEventListener('mousemove', onMouseMove);
  root.removeEventListener('touchmove', onMouseMove);
  window.removeEventListener('mouseup', onSwipeEnd);
  window.removeEventListener('touchend', onSwipeEnd);
  window.removeEventListener('touchleave', onSwipeEnd);
  window.removeEventListener('touchcancel', onSwipeEnd);
  swiperContext.onSwipeEnd();
};

watch(swiperContext.isSwiping, isSwiping => {
  if (isSwiping) swiperElement.value?.setAttribute('inert', true);
  else swiperElement.value.removeAttribute('inert');
});
</script>

<template>
  <component
    :is="as"
    ref="swiperElement"
    class="dsp-swiper-item"
    @mousedown="onSwipeStart"
    @touchstart.passive="onSwipeStart"
  >
    <slot />
  </component>
</template>

<style>
.dsp-swiper-item {
  flex-shrink: 0;
}
</style>
