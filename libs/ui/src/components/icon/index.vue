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
  console.log(props.icon, theme.icons);
  return theme.icons[props.icon];
});
const size = computed(() => `var(--spacing-${props.size})`);
// const http = useHttp();

// const getSvg = () => {
//   return http.get(url.value, { baseURL: '', responseType: 'text' });
// };

// const key = computed(() => `icon-${props.icon}`);
// const { data: svg } = useReactiveQuery(key, getSvg, {
//   staleTime: Infinity
// });
const display = computed(() => (props.isInline ? 'inline-flex' : 'flex'));
</script>

<template>
  <!-- eslint-disable vue/no-v-html-->
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
    *.icon__half-opaque {
      opacity: 0.4;
    }
  }
}
</style>
