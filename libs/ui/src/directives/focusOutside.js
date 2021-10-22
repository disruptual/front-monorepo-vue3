const listeners = new WeakMap();

export const vFocusOutside = {
  mounted(el, { value: cb }) {
    const listener = e => {
      const { target } = e;
      if (target !== el && !el.contains(target)) {
        cb(e);
      }
    };

    listeners.set(el, listener);
    window.addEventListener('focusin', listener);
  },

  unmounted(el) {
    const listener = listeners.get(el);
    window.removeEventListener('focusin', listener);
    listeners.delete(el);
  }
};
