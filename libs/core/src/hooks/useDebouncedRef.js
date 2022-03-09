import { ref, customRef } from 'vue';
import { debounce } from 'lodash-es';

export function useDebouncedRef(initialValue, delay) {
  const state = ref(initialValue);
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(value => {
      state.value = value;
      trigger();
    }, delay)
  }));
  return debouncedRef;
}
