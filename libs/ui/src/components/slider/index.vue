<script>
export default { name: 'DspSlider' };
</script>

<script setup>
import { ref } from 'vue';

defineProps({
  imageUrls: { type: Array, required: true }
});

const currentIndex = ref(0);
</script>

<template>
  <div>
    <div class="images">
      <dsp-fade-transition
        v-for="(url, index) in imageUrls"
        :key="url"
        :is-visible="index === currentIndex"
        distance="50px"
        appear
      >
        <img :src="url" />
      </dsp-fade-transition>
    </div>

    <dsp-flex gap="sm">
      <button
        v-for="(url, index) in imageUrls"
        :key="url"
        @click="currentIndex = index"
      >
        {{ index }}
      </button>
    </dsp-flex>
  </div>
</template>

<style lang="scss" scoped>
.images {
  display: grid;

  > * {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
}

img {
  display: block;
  max-width: 100px;
}
</style>
