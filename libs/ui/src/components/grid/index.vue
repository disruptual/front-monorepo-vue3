<script>
export default { name: 'DspGrid' };
</script>

<script setup>
import { computed } from 'vue';
import { isNumber, oneOf } from '@dsp/core';

const props = defineProps({
  as: { type: String, default: 'div' },
  columns: { type: [Number, String], required: true },
  rows: { type: [Number, String], default: null },
  gap: { type: [Number, String], default: 0 },
  justify: oneOf(
    [
      'flex-start',
      'flex-end',
      'center',
      'space-around',
      'space-between',
      'space-evenly'
    ],
    null
  ),
  align: oneOf(['flex-start', 'flex-end', 'center', 'stretch'], 'stretch')
});

const gridTemplate = computed(() => ({
  column: isNumber(props.columns)
    ? `repeat(${props.columns}, minmax(0, 1fr))`
    : props.columns,
  row: isNumber(props.rows)
    ? `repeat(${props.rows}, minmax(0, 1fr))`
    : props.rows,
  gap: isNumber(props.gap) ? `${props.gap}px` : `var(--spacing-${props.gap})`
}));
</script>

<template>
  <component :is="as" class="dsp-grid" v-bind="$attrs">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.dsp-grid {
  display: grid;
  grid-template-columns: v-bind('gridTemplate.column');
  grid-template-rows: v-bind('gridTemplate.row');
  grid-gap: v-bind('gridTemplate.gap');
  justify-items: v-bind(justify);
  align-items: v-bind(align);
}
</style>
