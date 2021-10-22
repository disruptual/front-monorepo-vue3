const observers = new WeakMap();

export const vOnIntersect = {
  mounted(el, { arg, value: cb }) {
    try {
      const onIntersect = entries => {
        entries.forEach(entry => {
          cb(entry);
        });
      };
      const observer = new window.IntersectionObserver(onIntersect, arg || {});
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
