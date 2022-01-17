<script>
export default { name: 'Carousel' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { Carousel } from '@dsp/business';
import { useDevice } from '@dsp/ui';

const props = defineProps({
  carousel: { type: Carousel, required: true }
});

const device = useDevice();

const carouselHeight = computed(() => {
  const { carousel } = props;
  const height = device.isMobile
    ? carousel.carouselMobileHeight
    : carousel.carouselHeight;

  return `${height}px`;
});

const slides = computed(() =>
  props.carousel.carouselItems.filter(c => {
    return device.isMobile ? !c.destkop : c.desktop;
  })
);

const currentIndex = ref(0);

const getSlideStyle = slide => {
  console.log(slide);
  return {
    '--col-start': slide.textPositionX,
    '--col-end': slide.textPositionXEnd,
    '--row-start': slide.textPositionY,
    '--row-end': slide.textPositionYEnd,
    '--background': slide.textHasAnOverlay ? 'rgba(0,0,0,0.5)' : 'transparent'
  };
};
</script>

<template>
  <div class="carousel">
    <transition
      v-for="(slide, index) in slides"
      :key="slide.id"
      :duration="500"
      name="carousel-slide"
    >
      <div
        v-if="index === currentIndex"
        class="carousel__slide"
        :style="{ '--background': `url(${slide.media.url})` }"
      >
        <dsp-flex
          v-show="!carousel.imagesAsLink"
          direction="column"
          gap="sm"
          wrap="nowrap"
          class="slide-content"
          :style="getSlideStyle(slide)"
        >
          <p class="slide-content__title">{{ slide.title }}</p>
          <p class="slide-content__content">{{ slide.content }}</p>
          <a v-if="slide.link" class="slide-content__link" :href="slide.link">
            {{ slide.btn }}
          </a>
        </dsp-flex>
      </div>
    </transition>
    <dsp-flex class="navigation" justify="center" gap="sm">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="currentIndex = index"
      />
    </dsp-flex>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  position: relative;
  max-width: 100%;
  display: grid;
  > * {
    grid-column: 1;
    grid-row: 1;
  }

  &:deep(.dsp-swiper-item) {
    width: 100%;
  }
}
.carousel__slide {
  --grid-size: v-bind('carousel.contentGridSize');
  width: 100%;
  height: v-bind(carouselHeight);
  background: var(--background, #444);
  background-size: cover;
  background-position: center;

  display: grid;
  grid-template-columns: repeat(var(--grid-size), minmax(0, 1fr));
  grid-template-rows: repeat(var(--grid-size), minmax(0, 1fr));
  &.carousel-slide-enter-active,
  &.carousel-slide-leave-active {
    transition: transform 500ms;
  }

  &.carousel-slide-enter-from {
    transform: translateX(100%);
  }
  &.carousel-slide-leave-to {
    transform: translateX(-100%);
  }
}

.navigation {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: var(--spacing-sm);

  button {
    padding: 0;
    width: 1em;
    height: 1em;
    background-color: var(--color-brand-500);
    border: none;
    border-radius: var(--border-radius-circle);
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: var(--color-brand-700);
    }
  }
}

.slide-content {
  grid-column: var(--col-start) / var(--col-end);
  grid-row: var(--row-start) / var(--row-end);
  background-color: var(--background);
  color: white;
  padding: var(--spacing-lg);

  p {
    margin: 0;
  }

  a {
    margin-top: auto;
    text-decoration: none;
    border: solid 1px white;
    padding: var(--spacing-sm);
    border-radius: var(--border-radius-pill);
    width: fit-content;
    color: inherit;
  }
}
</style>
