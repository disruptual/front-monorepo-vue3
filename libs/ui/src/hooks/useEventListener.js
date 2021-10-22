import { onMounted, onUnmounted, unref, watch } from 'vue';

export const useEventListener = (eventName, handler) => {
  const removeListener = () => {
    window.removeEventListener(unref(eventName), unref(handler));
  };

  const addListener = () => {
    window.addEventListener(unref(eventName), unref(handler));
  };

  watch(
    () => eventName,
    (_, oldVal) => {
      window.removeEventListener(unref(oldVal), unref(handler));
      addListener();
    }
  );

  watch(
    () => handler,
    (_, oldVal) => {
      window.removeEventListener(unref(eventName), unref(oldVal));
      addListener();
    }
  );

  onMounted(addListener);
  onUnmounted(removeListener);
};
