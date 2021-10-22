const observers = new WeakMap();

export const vOnResize = {
  mounted(el, { value: cb }) {
    try {
      const observer = new window.ResizeObserver(cb);
      observers.set(el, observer);
      observer.observe(el);
    } catch (err) {
      console.error(err);
    }
  },

  unmounted(el) {
    const observer = observers.get(el);
    observer.unobserve(el);
    observers.delete(el);
  }
};
