<script>
export default { name: 'DspImage' };
</script>

<script setup>
const props = defineProps({
  src: { type: String, default: null }
});
</script>

<template>
  <div v-if="!props.src" class="dsp-image__placeholder"></div>
  <img v-else class="dsp-image" :src="props.src" loading="lazy" />
</template>

<style lang="scss" scoped>
.dsp-image__placeholder {
  @include loading-content;
}
</style>
