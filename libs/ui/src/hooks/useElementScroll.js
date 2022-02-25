import { ref, onMounted, onUnmounted } from 'vue';

export const useElementScroll = elementRef => {
  const scrollTop = ref(0);

  const onScroll = e =>
    requestAnimationFrame(() => {
      scrollTop.value = e.target.scrollTop;
    });

  onMounted(() => {
    scrollTop.value = elementRef.value.scrollTop;
    elementRef.value.addEventListener('scroll', onScroll, { passive: true });
  });

  onUnmounted(() => {
    elementRef.value.removeEventListener('scroll', onScroll);
  });

  return scrollTop;
};
