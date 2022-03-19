<script>
export default { name: 'CarouselSlide' };
</script>

<script setup>
const props = defineProps({
  slide: { type: Object, required: true },
  gridSize: { type: [String, Number], required: true },
  hasContent: { type: Boolean, required: true }
});

const getSlideStyle = slide => {
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
  <div
    class="carousel-slide"
    :style="{ '--background': `url(${slide.media.url})` }"
  >
    <dsp-flex
      v-show="hasContent"
      direction="column"
      gap="sm"
      wrap="nowrap"
      class="slide-content"
      :style="getSlideStyle(slide)"
    >
      <span class="slide-content__title">{{ slide.title }}</span>
      <span class="slide-content__content">{{ slide.content }}</span>
      <a v-if="slide.link" class="slide-content__link" :href="slide.link">
        {{ slide.btn }}
      </a>
    </dsp-flex>
  </div>
</template>

<style lang="scss" scoped>
.carousel-slide {
  --grid-size: v-bind('props.gridSize');
  width: 100%;
  height: 350px;
  padding: var(--spacing-md);
  background: var(--background, #444);
  background-size: cover;
  background-position: center;

  display: grid;
  grid-template-columns: repeat(var(--grid-size), minmax(0, 1fr));
  grid-template-rows: repeat(var(--grid-size), minmax(0, 1fr));
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

.slide-content__title {
  font-size: var(--font-size-3xl);

  @include tablet-only {
    font-size: var(--font-size-xl);
  }

  @include mobile-only {
    font-size: var(--font-size-lg);
  }
}

.slide-content__content {
  font-size: var(--font-size-lg);
}
</style>
