import { getReadableColor } from '@dsp/ui/utils/getReadableColor';
import { nextTick } from 'vue';

const observers = new WeakMap();

export const vReadableColor = {
  mounted(el) {
    function setColor() {
      const computedStyle = window.getComputedStyle(el);
      if (!computedStyle.backgroundColor) return;

      const color =
        import.meta.env.NODE_ENV === 'test'
          ? '#000'
          : getReadableColor(computedStyle.backgroundColor);

      el.style.color = color;
    }

    setColor();

    const observer = new window.MutationObserver(setColor);
    if (el) {
      observer.observe(el, {
        attributes: true,
        childList: false,
        subtree: false
      });
      observers.set(el, observer);
      el.addEventListener('mouseenter', setColor);
      el.addEventListener('mouseleave', setColor);
      el.addEventListener('focus', setColor);
      el.addEventListener('blur', setColor);
      el.addEventListener('transitionend', setColor);
    }
  },

  unmounted(el) {
    const observer = observers.get(el);
    observer?.unobserve?.(el);
    observers.delete(el);
  }
};
