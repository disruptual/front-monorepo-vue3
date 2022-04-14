<script>
export default { name: 'DspSlider' };
</script>
<script setup>
import { ref } from 'vue';
defineProps({
  imagesUrls: { type: Array, required: true }
});
const currentIndex = ref(0);
</script>
<template>
  <dsp-flex gap="sm" direction="column">
    <dsp-flex class="images" wrap="nowrap">
      <transition
        v-for="(url, index) in imagesUrls"
        :key="url"
        :duration="350"
        name="carousel-slide"
      >
        <div
          v-if="index === currentIndex"
          class="carousel__slide"
          :style="{ '--background': `url(${url})` }"
        >
          <img class="image" :src="url" />
        </div>
      </transition>
    </dsp-flex>
    <dsp-flex gap="sm" justify="center">
      <button
        v-for="(url, index) in imagesUrls"
        :key="url"
        class="navigation"
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
      ></button>
    </dsp-flex>
  </dsp-flex>
</template>
<style lang="scss" scoped>
.images {
  max-width: 100vw;
  display: grid;
  grid-auto-columns: 1fr;
  overflow: hidden;

  > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.image {
  height: 250px;
  opacity: 0;
  @include mobile-only {
    height: 200px;
  }
}

.carousel__slide {
  margin: auto;
  padding: var(--spacing-md);
  background: var(--background, #444);
  background-size: cover;
  background-position: center;
}

.carousel-slide-enter-active,
.carousel-slide-leave-active {
  transition: all 500ms;
}

.carousel-slide-enter-from {
  transform: translateX(100%);
  opacity: 1;
}
.carousel-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.navigation {
  width: var(--spacing-md);
  height: var(--spacing-md);
  background: var(--color-separator);
  border: none;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  &.active {
    background: var(--color-brand-500);
  }
}
</style>
