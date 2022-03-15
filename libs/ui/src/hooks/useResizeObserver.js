import { unref, onMounted, onUnmounted } from 'vue';
import { isString } from '@dsp/core';

export function useResizeObserver(domElement, onResize) {
  const observer = new window.ResizeObserver(entries =>
    onResize(entries, observer)
  );

  onMounted(() => {
    const element = isString(domElement)
      ? document.querySelector(domElement)
      : unref(domElement);

    observer.observe(element);
  });

  onUnmounted(() => {
    if (!unref(domElement)) return;
    const element = isString(domElement)
      ? document.querySelector(domElement)
      : unref(domElement);

    observer.unobserve(element);
  });

  return observer;
}
