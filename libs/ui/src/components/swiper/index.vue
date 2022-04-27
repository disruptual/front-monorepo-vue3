<script>
export default { name: 'DspSwiper' };
</script>

<script setup>
import { reactive, ref, provide, nextTick, computed, onMounted } from 'vue';
import { useDevice } from '@dsp/ui/hooks/useDevice';
import { useCssProperty } from '@dsp/ui/hooks/useCssProperty';
import { throttle, debounce } from 'lodash-es';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const props = defineProps({
  as: { type: String, default: 'div' },
  gap: { type: String, default: 'xs' },
  hasControls: { type: Boolean, default: false }
});

const device = useDevice();
const state = reactive({
  slides: [],
  isScrolled: false,
  isFullyScrolled: false,
  currentIndex: 0
});
const rootElement = ref(null);
const innerElement = ref(null);
const isSwiping = ref(false);

const register = slide => {
  state.slides.push(slide);
};

const checkScroll = () => {
  state.isScrolled = rootElement.value.scrollLeft !== 0;
  state.isFullyScrolled =
    Math.round(rootElement.value.scrollLeft + rootElement.value.clientWidth) >=
    rootElement.value.scrollWidth;
};

const setCurrentIndex = throttle(() => {
  state.currentIndex = state.slides.findIndex(
    ({ elementRef, ...slide }, index) => {
      const { left } = elementRef.getBoundingClientRect();
      return left >= 0;
    }
  );
}, 50);

onMounted(() => {
  nextTick(checkScroll);
});

const move = offset => {
  const newScrollLeft = rootElement.value.scrollLeft - offset;
  rootElement.value.scrollLeft = newScrollLeft;
};

const onScroll = debounce(() => {
  nextTick(() => {
    checkScroll();
    setCurrentIndex();
  });
}, 50);

const onWheel = e => {
  // if (!device.isDesktop) return;
  // const shouldIgnore =
  //   (e.deltaY > 0 && state.isFullyScrolled) ||
  //   (e.deltaY < 0 && !state.isScrolled);
  // if (shouldIgnore) return;
  // e.preventDefault();
  // move(e.deltaY * -1);
};

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
  const { left: slideLeft } = elementRef.getBoundingClientRect();
  rootElement.value.style.scrollBehavior = 'smooth';
  move(-1 * (slideLeft - rootLeft));
  nextTick(() => {
    rootElement.value.style.scrollBehavior = 'auto';
  });
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
</script>

<template>
  <div class="dsp-swiper">
    <dsp-fade-transition
      :is-visible="state.currentIndex > 0 && props.hasControls"
      class="dsp-swiper__prev-control"
      appear
    >
      <dsp-icon-button
        icon="chevronLeft"
        @click="goTo(state.currentIndex - 1)"
      />
    </dsp-fade-transition>

    <div
      ref="rootElement"
      class="dsp-swiper__wrapper"
      @wheel="onWheel"
      @scroll="onScroll"
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

    <dsp-fade-transition
      :is-visible="
        state.currentIndex < state.slides.length &&
        !state.isFullyScrolled &&
        props.hasControls
      "
      class="dsp-swiper__next-control"
      appear
    >
      <dsp-icon-button
        icon="chevronRight"
        @click="goTo(state.currentIndex + 1)"
      />
    </dsp-fade-transition>
  </div>
</template>

<style lang="scss" scoped>
.dsp-swiper {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
}

.dsp-swiper__wrapper {
  overflow-x: hidden;
  grid-column: 1 / -1;
  grid-row: 1;
}

.dsp-swiper__inner {
  /* transform: translateX(var(--dsp-swiper-offset)); */
  padding: 0;
  margin: 0;
}

.dsp-swiper__prev-control {
  position: sticky;
  left: 0;
  z-index: 1;
  grid-row: 1;
  grid-column: 1;
}

.dsp-swiper__next-control {
  position: sticky;
  // position sticky and right: 0 seems not to be working
  left: 100%;
  /* transform: translateX(-100%); */
  z-index: 1;
  grid-row: 1;
  grid-column: 3;
}
</style>
