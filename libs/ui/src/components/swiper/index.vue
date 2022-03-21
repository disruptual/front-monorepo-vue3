<script>
export default { name: 'DspSwiper' };
</script>

<script setup>
import { reactive, ref, provide, nextTick, computed, onMounted } from 'vue';
import { useDevice } from '@dsp/ui/hooks/useDevice';
import { useCssProperty } from '@dsp/ui/hooks/useCssProperty';
import { throttle } from 'lodash-es';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const props = defineProps({
  as: { type: String, default: 'div' },
  gap: { type: String, default: 'xs' },
  hasFade: { type: Boolean, default: false }
});

const device = useDevice();
const state = reactive({ slides: [], fadeLeft: false, fadeRight: false });
const rootElement = ref(null);
const innerElement = ref(null);
const isSwiping = ref(false);

const register = slide => {
  state.slides.push(slide);
};

const checkFades = () => {
  state.fadeLeft = rootElement.value.scrollLeft !== 0;
  const isFullyScrolled =
    rootElement.value.scrollLeft + rootElement.value.clientWidth >=
    rootElement.value.scrollWidth;

  state.fadeRight = !isFullyScrolled;
};

onMounted(checkFades);

const move = offset => {
  rootElement.value.scrollLeft = rootElement.value.scrollLeft - offset;
  nextTick(checkFades);
};

const onWheel = throttle(e => {
  if (!device.isDesktop) return;
  move(e.deltaY * -1);
}, 16);

const onSwipeStart = () => {
  isSwiping.value = true;
};

const onSwipeEnd = () => {
  nextTick(() => {
    isSwiping.value = false;
  });
};

const goTo = index => {
  const { elementRef } = state.slides[index];
  const { left: rootLeft } = rootElement.value.getBoundingClientRect();
  const { left: slideLeft } = elementRef.value.getBoundingClientRect();
  rootElement.value.scrollLeft = slideLeft - rootLeft;
};

provide(CONTEXT_KEYS.SWIPER, {
  root: rootElement,
  isSwiping,
  register,
  move,
  goTo,
  onSwipeStart,
  onSwipeEnd
});

const classes = computed(() => [
  props.hasFade && state.fadeLeft && 'dsp-swiper--has-fade-left',
  props.hasFade && state.fadeRight && 'dsp-swiper--has-fade-right'
]);

useCssProperty({
  name: '--dsp-swiper-fade-left',
  syntax: '<color>',
  inherits: false,
  initialValue: 'black'
});
useCssProperty({
  name: '--dsp-swiper-fade-right',
  syntax: '<color>',
  inherits: false,
  initialValue: 'black'
});
</script>

<template>
  <div
    ref="rootElement"
    class="dsp-swiper"
    :class="classes"
    @wheel.prevent="onWheel"
  >
    <dsp-flex
      ref="innerElement"
      :as="as"
      class="dsp-swiper__inner"
      :gap="props.gap"
      wrap="nowrap"
      v-bind="$attrs"
    >
      <slot />
    </dsp-flex>
  </div>
</template>

<style lang="scss" scoped>
.dsp-swiper {
  max-width: 100vw;
  overflow-x: hidden;
  @include desktop-only {
    --dsp-swiper-fade-left: rgba(0, 0, 0, 1);
    --dsp-swiper-fade-right: rgba(0, 0, 0, 1);
    transition: --dsp-swiper-fade-left var(--transition-sm),
      --dsp-swiper-fade-right var(--transition-sm);
    -webkit-mask-image: linear-gradient(
      to right,
      var(--dsp-swiper-fade-left),
      black 8%,
      black 92%,
      var(--dsp-swiper-fade-right)
    );
    mask-image: linear-gradient(
      to right,
      var(--dsp-swiper-fade-left),
      black 8%,
      black 92%,
      var(--dsp-swiper-fade-right)
    );
  }
}
.dsp-swiper--has-fade-right {
  --dsp-swiper-fade-right: rgba(0, 0, 0, 0.25);
}

.dsp-swiper--has-fade-left {
  --dsp-swiper-fade-left: rgba(0, 0, 0, 0.25);
}

.dsp-swiper__inner {
  /* transform: translateX(var(--dsp-swiper-offset)); */
  padding: 0;
  margin: 0;
}
</style>
