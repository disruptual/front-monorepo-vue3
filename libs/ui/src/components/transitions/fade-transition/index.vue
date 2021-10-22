<script>
export default { name: 'DspFadeTransition' };
</script>

<script setup>
import { computed } from 'vue';

defineEmits(['toggle']);
const props = defineProps({
  isVisible: { type: Boolean, required: true },
  duration: { type: Number, default: 300 },
  appear: { type: Boolean, default: false }
});

const transition = computed(() => `${props.duration}ms`);
</script>

<template>
  <transition name="fade" v-bind="$attrs" :appear="props.appear">
    <div v-if="props.isVisible" class="fade-transition"><slot /></div>
  </transition>
</template>

<style lang="scss" scoped>
.fade-transition {
  transition: opacity v-bind(transition);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
