<script>
export default { name: 'DspSurface' };
</script>

const
<script setup>
import { computed } from 'vue';
import { useReadableColor } from '@dsp/ui/hooks/useReadableColor';
import schema from './index.schema';

const props = defineProps({
  as: { type: String, default: 'div' },
  ...schema.toProps()
});

const config = schema.toContext(props);

const classes = computed(
  () => config.value.isRounded && 'dsp-surface--is-rounded'
);

const textColor = useReadableColor('--color-surface');
</script>
<template>
  <component :is="as" class="dsp-surface" :class="classes">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.dsp-surface {
  padding: var(--spacing-lg);
  background-color: var(--color-surface);
  color: v-bind(textColor);
}

.dsp-surface--is-rounded {
  border-radius: var(--border-radius-sm);
}
</style>
