<script>
export default { name: 'DspInfiniteScroll' };
</script>

<script setup>
import {
  onMounted,
  onBeforeUnmount,
  ref,
  unref,
  computed,
  nextTick
} from 'vue';

const props = defineProps({
  buffer: { type: Number, default: 350 },
  root: { type: null, default: null }
});
const emit = defineEmits(['loadMore']);

const observer = ref(null);
const trigger = ref(null);

const onIntersect = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      emit('loadMore');
    }
  });
};

const root = computed(() => props.root || document);

const initObserver = () => {
  observer.value = new window.IntersectionObserver(onIntersect, {
    root: unref(root),
    rootMargin: `${props.buffer}px`
  });
  cleanup();
  observer.value.observe(trigger.value);
};

const cleanup = () => {
  unref(root).removeEventListener('scroll', initObserver);
};

onMounted(() => {
  nextTick(() => {
    console.log(unref(root));
    unref(root).addEventListener('scroll', initObserver);
  });
});

onBeforeUnmount(cleanup);
</script>

<template>
  <slot />
  <div ref="trigger" class="infinite-scroll-trigger" />
</template>

<style lang="scss" scoped>
.infinite-scroll-trigger {
  height: 2px;
}
</style>
