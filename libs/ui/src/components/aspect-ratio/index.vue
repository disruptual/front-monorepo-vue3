<script>
export default { name: 'DspAspectRatio' };
</script>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  ratio: { type: Number, default: 1 }
});

const paddingTop = computed(() => `${(1 / props.ratio) * 100}%`);
</script>

<template>
  <div class="dsp-aspect-ratio">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.dsp-aspect-ratio {
  position: relative;
  height: 0;
  /* padding-top: v-bind(paddingTop); */
  aspect-ratio: v-bind(ratio);
  /* 
  :slotted(*) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  } */
}
</style>
