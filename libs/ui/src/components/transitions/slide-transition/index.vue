<script>
export default { name: 'DspSlideTransition' };
</script>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  isVisible: { type: Boolean, required: true },
  direction: {
    type: String,
    default: 'horizontal',
    validator: val => ['horizontal', 'vertical'].includes(val)
  },
  duration: { type: Number, default: 300 },
  distance: { type: String, default: '100%' },
  appear: { type: Boolean, default: false }
});
defineEmits(['toggle']);

const style = computed(() => ({
  duration: `${props.duration}ms`,
  distance: `${props.distance}`
}));
</script>

<template>
  <transition
    name="slide"
    mode="out-in"
    :appear="props.appear"
    :duration="props.duration"
  >
    <div
      v-if="props.isVisible"
      class="slide-transition"
      :class="`slide-transition--${props.direction}`"
    >
      <slot />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.slide-transition {
  &.slide-enter-active,
  &.slide-leave-active {
    transition: transform v-bind('style.duration');
  }

  &.slide-transition--horizontal {
    &.slide-enter-from,
    &.slide-leave-to {
      transform: translateX(v-bind('style.distance'));
    }
  }

  &.slide-transition--vertical {
    &.slide-enter-from,
    &.slide-leave-to {
      transform: translateY(var(--slide-transition-distance));
    }
  }
}
</style>
