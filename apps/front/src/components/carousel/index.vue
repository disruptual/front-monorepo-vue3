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

// const aspectRatio = ref(null);
// const imageReference = computed(() => {
//   const slide = props.carousel.carouselItems.find(item =>
//     device.isMobile ? !item.desktop : item.desktop
//   );

//   return slide.media.url;
// });
// const loadReferenceImage = url => {
//   aspectRatio.value = null;
//   const img = new Image();
//   img.src = url;
//   img.onload = () => {
//     aspectRatio.value = `${img.naturalWidth} / ${img.naturalHeight}`;
//   };
// };
// watch(imageReference, loadReferenceImage, { immediate: true });

const displayedSlides = computed(() =>
  props.carousel.carouselItems
    .filter(c => (device.isMobile ? !c.desktop : c.desktop))
    .sort((a, b) => a.position - b.position)
);

const currentIndex = ref(0);
const oldIndex = ref(0);
const onSwipe = ({ direction }) => {
  if (direction === 'left') {
    currentIndex.value =
      currentIndex.value === 0
        ? displayedSlides.value.length - 1
        : currentIndex.value - 1;
  }

  if (direction === 'right') {
    currentIndex.value =
      currentIndex.value === displayedSlides.value.length - 1
        ? 0
        : currentIndex.value + 1;
  }
};
watch(currentIndex, (_, old) => {
  oldIndex.value = old;
});
const transitionDistance = computed(() => {
  console.log(oldIndex.value, currentIndex.value);
  return oldIndex.value >= currentIndex.value ? '100%' : '-100%';
});
</script>

<template>
  <div v-on-swipe="onSwipe" class="carousel">
    <transition
      v-for="(slide, index) in displayedSlides"
      :key="slide.id"
      :duration="600"
      name="carousel-slide"
    >
      <CarouselSlide
        v-if="currentIndex === index"
        :slide="slide"
        :grid-size="carousel.contentGridSize"
        :has-content="!carousel.imagesAsLink"
      />
    </transition>

    <CarouselNavigation
      v-if="displayedSlides.length > 1"
      v-model="currentIndex"
      class="navigation"
      :element-count="displayedSlides.length"
    />
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  position: relative;
  max-width: 100vw;
  display: grid;
  overflow: hidden;

  > * {
    grid-column: 1;
    grid-row: 1;
  }

  &:deep(.dsp-swiper-item) {
    width: 100%;
  }
}

.navigation {
  position: absolute;
  bottom: var(--spacing-sm);
  width: 100%;
}

.carousel-slide-enter-active,
.carousel-slide-leave-active {
  transition: transform var(--transition-md);
}

.carousel-slide-enter-from {
  transform: translateX(v-bind(transitionDistance));
}
.carousel-slide-leave-to {
  transform: translateX(calc(-1 * v-bind(transitionDistance)));
  opacity: 0;
}
</style>
