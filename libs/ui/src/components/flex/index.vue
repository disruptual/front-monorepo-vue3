<script>
export default { name: 'DspFlex' };
</script>

<script setup>
import { computed } from 'vue';
import { oneOf } from '@dsp/core';
import { checkFlexGap } from '@dsp/ui/utils/featureDetection';

const props = defineProps({
  as: { type: String, default: 'div' },
  direction: oneOf(['row', 'column', 'row-reverse', 'column-reverse'], 'row'),
  justify: oneOf(
    [
      'flex-start',
      'flex-end',
      'center',
      'space-around',
      'space-between',
      'space-evenly'
    ],
    'flex-start'
  ),
  align: oneOf(['flex-start', 'flex-end', 'center', 'stretch'], 'stretch'),
  wrap: oneOf(['wrap', 'nowrap'], 'wrap'),
  gap: oneOf(['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'], 'none')
});

defineEmits(['foo', 'bar']);

const isFlexboxGapSupported = checkFlexGap();

const gap = computed(() => `var(--spacing-${props.gap})`);
const classes = computed(() =>
  isFlexboxGapSupported
    ? []
    : [
        ['row', 'row-reverse'].includes(props.direction) &&
          'dsp-flex--safari-gap-fix-horizontal',

        ['column', 'column-reverse'].includes(props.direction) &&
          'dsp-flex--safari-gap-fix-vertical'
      ]
);
</script>

<template>
  <component :is="as" class="dsp-flex" :class="classes">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.dsp-flex {
  display: flex;
  flex-direction: v-bind('props.direction');
  justify-content: v-bind('props.justify');
  align-items: v-bind('props.align');
  flex-wrap: v-bind('props.wrap');
  gap: v-bind('gap');
}

.dsp-flex--safari-gap-fix-horizontal > * + * {
  margin-left: v-bind('gap');
}
.dsp-flex--safari-gap-fix-vertical > * + * {
  margin-top: v-bind('gap');
}
</style>
