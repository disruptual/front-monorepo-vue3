<script>
export default { name: 'Carousel' };
</script>

<script setup>
import { computed, ref, watch } from 'vue';
import { Carousel } from '@dsp/business';
import { useDevice, vOnSwipe } from '@dsp/ui';
import CarouselSlide from './carousel-slide/index.vue';
import CarouselNavigation from './carousel-navigation/index.vue';

const props = defineProps({
  carousel: { type: Carousel, required: true }
});

const device = useDevice();

const displayedSlides = computed(() =>
  props.carousel.carouselItems
    .filter(c => (device.isMobile ? !c.desktop : c.desktop))
    .sort((a, b) => a.position - b.position)
);

const currentIndex = ref(0);
const direction = ref('forwards');
const next = () => {
  direction.value = 'forwards';
  currentIndex.value =
    currentIndex.value === displayedSlides.value.length - 1
      ? 0
      : currentIndex.value + 1;
};
const prev = () => {
  direction.value = 'backwards';
  currentIndex.value =
    currentIndex.value === 0
      ? displayedSlides.value.length - 1
      : currentIndex.value - 1;
};

let interval = setInterval(() => {
  next();
}, 8000);

const goTo = index => {
  direction.value = index >= currentIndex.value ? 'forwards' : 'backwards';
  currentIndex.value = index;
  clearInterval(interval);
  interval = setInterval(() => {
    next();
  }, 8000);
};

const navigationVModel = computed({
  get() {
    return currentIndex.value;
  },
  set(index) {
    goTo(index);
  }
});

const onSwipe = ({ direction }) => {
  if (direction === 'left') {
    next();
  }

  if (direction === 'right') {
    prev();
  }
};
const transitionDistance = computed(() =>
  direction.value === 'forwards' ? '100%' : '-100%'
);
</script>

<template>
  <div v-on-swipe="onSwipe" class="carousel">
    <dsp-slide-transition
      :duration="600"
      mode="in-out"
      :distance="transitionDistance"
      invert-on-out
      is-group
    >
      <CarouselSlide
        v-for="(slide, index) in displayedSlides"
        v-show="currentIndex === index"
        :key="index"
        class="carousel__slide"
        :slide="slide"
        :grid-size="carousel.contentGridSize"
        :has-content="!carousel.imagesAsLink"
      />
    </dsp-slide-transition>

    <CarouselNavigation
      v-if="displayedSlides.length > 1"
      v-model="navigationVModel"
      class="navigation"
      :element-count="displayedSlides.length"
    />
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  position: relative;
  max-width: var(--100-vw);
  display: grid;
  overflow: hidden;

  > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.carousel__slide {
  height: v-bind('carousel.carouselHeight + "px"');
  @include mobile-only {
    height: v-bind('carousel.carouselMobileHeight + "px"');
  }
}

.navigation {
  position: absolute;
  bottom: var(--spacing-sm);
  width: 100%;
}
</style>
