<script>
export default { name: 'DspGridItem' };
</script>

<script setup>
defineProps({
  as: { type: String, default: 'div' },
  column: { type: [Number, String], default: null },
  row: { type: [Number, String], default: null }
});
</script>

<template>
  <component :is="as" class="dsp-grid-item">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.dsp-grid-item {
  grid-column: v-bind(column);
  grid-row: v-bind(row);
}
</style>
