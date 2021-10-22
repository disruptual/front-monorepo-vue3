const listeners = new WeakMap();

export const vClickOutside = {
  mounted(el, { value: cb }) {
    const listener = e => {
      const { target } = e;
      if (target !== el && !el.contains(target)) {
        cb(e);
      }
    };

    listeners.set(el, listener);
    window.addEventListener('mousedown', listener);
  },

  unmounted(el) {
    const listener = listeners.get(el);
    window.removeEventListener('mousedown', listener);
    listeners.delete(el);
  }
};
