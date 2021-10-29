import { getReadableColor } from '@dsp/ui/utils/getReadableColor';

const observers = new WeakMap();

function setColor(el) {
  const computedStyle = window.getComputedStyle(el);
  if (!computedStyle.backgroundColor) return;

  el.style.color = getReadableColor(computedStyle.backgroundColor);
}

export const vReadableColor = {
  mounted(el) {
    setColor(el);

    const observer = new window.MutationObserver(() => setColor(el));
    observer.observe(el, {
      attributes: true,
      childList: false,
      subtree: false
    });
    observers.set(el, observer);
    el.addEventListener('mouseenter', () => {
      setColor(el);
    });

    el.addEventListener('mouseleave', () => {
      setColor(el);
    });

    el.addEventListener('focus', () => {
      setColor(el);
    });

    el.addEventListener('blur', () => {
      setColor(el);
    });
  },

  unmounted(el) {
    const observer = observers.get(el);
    observer?.unobserve?.(el);
    observers.delete(el);
  }
};
