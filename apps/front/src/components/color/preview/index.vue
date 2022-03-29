<script>
export default { name: 'ColorPreview' };
</script>

<script setup>
import { computed } from 'vue';
import { Color } from '@dsp/business';

const props = defineProps({
  color: { type: Color, required: true },
  size: { type: String, default: 'lg' },
  isRounded: { type: Boolean, default: true }
});

const style = computed(() => ({
  size: `calc(2 * var(--spacing-${props.size}))`,
  color: `#${props.color.hex}`,
  borderRadius: props.isRounded ? 'var(--border-radius-circle)' : 'none'
}));
</script>

<template>
  <dsp-center gap="xs">
    <img
      v-if="color.imageUrl"
      :src="color.imageUrl"
      class="color-preview"
      :alt="color.name"
      v-bind="$attrs"
    />
    <div v-else class="color-preview" :style="style" v-bind="$attrs" />
    {{ props.color.name }}
  </dsp-center>
</template>

<style lang="scss" scoped>
.color-preview {
  width: v-bind('style.size');
  aspect-ratio: 1;
  background-color: v-bind('style.color');
  border-radius: v-bind('style.borderRadius');
  border: solid 1px var(--color-separator);
}
</style>
