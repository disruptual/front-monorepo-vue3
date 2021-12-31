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
      <dsp-slide-transition
        v-for="(url, index) in imagesUrls"
        :key="url"
        :is-visible="index === currentIndex"
        appears
        duration="1"
        distance="0px"
      >
        <img class="image" :src="url" />
      </dsp-slide-transition>
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
.image {
  height: 250px;
  @include mobile-only {
    height: 200px;
  }
}
.navigation {
  width: 12px;
  height: 12px;
  background: var(--color-separator);
  border: none;
  border-radius: var(--border-radius-pill);
  &.active {
    background: var(--color-primary);
  }
}
</style>
