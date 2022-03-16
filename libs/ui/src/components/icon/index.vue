<script>
export default { name: 'DspIcon' };
</script>

<script setup>
import { computed } from 'vue';
import { useTheme } from '@dsp/ui/hooks/useTheme';
import { oneOf, useReactiveQuery, useHttp } from '@dsp/core';

const props = defineProps({
  as: { type: String, default: 'div' },
  icon: { type: String, required: true },
  size: oneOf(['sm', 'md', 'lg', 'xl', 'xxl'], 'md'),
  isInline: { type: Boolean, default: false }
});

const theme = useTheme();
const iconComponent = computed(() => {
  return theme.icons[props.icon];
});
const size = computed(() => `var(--spacing-${props.size})`);
const display = computed(() => (props.isInline ? 'inline-flex' : 'flex'));
</script>

<template>
  <component :is="as" class="dsp-icon">
    <component :is="iconComponent" />
  </component>
</template>

<style lang="scss" scoped>
.dsp-icon {
  width: v-bind(size);
  height: v-bind(size);
  display: v-bind('display');
  justify-content: center;
  align-items: center;

  &:deep(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;

    *.icon__half-opaque {
      opacity: 0.4;
    }
  }
}
</style>
