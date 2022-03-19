<script>
export default { name: 'DspSlideTransition' };
</script>
<script setup>
import { computed, Transition, TransitionGroup } from 'vue';

const props = defineProps({
  direction: {
    type: String,
    default: 'horizontal',
    validator: val => ['horizontal', 'vertical'].includes(val)
  },
  duration: { type: Number, default: 300 },
  distance: { type: String, default: '100%' },
  appear: { type: Boolean, default: false },
  invertOnOut: { type: Boolean, default: false },
  isGroup: { type: Boolean, default: false },
  mode: { type: String, default: 'out-in' }
});

const style = computed(() => ({
  duration: `${props.duration}ms`,
  inDistance: props.distance,
  outDistance: props.invertOnOut
    ? `calc(-1 * ${props.distance})`
    : props.distance
}));

const transitionName = computed(() => `slide-${props.direction}`);
const is = computed(() => (props.isGroup ? TransitionGroup : Transition));
</script>

<template>
  <component
    :is="is"
    :name="transitionName"
    :appear="props.appear"
    :duration="props.duration"
    :mode="props.mode"
  >
    <slot />
  </component>
</template>

<style lang="scss">
.slide-horizontal-enter-active,
.slide-vertical-enter-active,
.slide-horizontal-leave-active,
.slide-vertical-leave-active {
  transition: transform v-bind('style.duration');
}

.slide-horizontal-enter-from {
  transform: translateX(v-bind('style.inDistance'));
}
.slide-horizontal-leave-to {
  transform: translateX(v-bind('style.outDistance'));
}

.slide-vertical-enter-from {
  transform: translateY(v-bind('style.inDistance'));
}
.slide-vertical-leave-to {
  transform: translateY(v-bind('style.outDistance'));
}
</style>
