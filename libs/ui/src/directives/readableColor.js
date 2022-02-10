import {
  TRANSPARENT_VALUES,
  getReadableColor
} from '@dsp/ui/utils/getReadableColor';
import { throttle } from 'lodash-es';

const observers = new WeakMap();

export const vReadableColor = {
  mounted(el) {
    const setColor = (checkedElement = el) => {
      const bgColor = window.getComputedStyle(checkedElement).backgroundColor;
      if (bgColor && !TRANSPARENT_VALUES.includes(bgColor)) {
        // @FIXME
        const color =
          import.meta.env.NODE_ENV === 'test'
            ? '#000'
            : getReadableColor(bgColor);

        checkedElement.style.setProperty('--readable-color', color);
        if (checkedElement !== el) {
          el.style.setProperty('--readable-color', null);
        }
        checkedElement.dataset.readableColor = 'true';
        el.dataset.readableColor = 'true';
      } else if (checkedElement.parentElement) {
        setColor(checkedElement.parentElement);
      }
    };

    requestAnimationFrame(() => {
      setColor();
    });

    const throttledSetColor = throttle(() => setColor(), 50);
    const observer = new window.MutationObserver(mutationList => {
      const shouldIgnore = mutationList.some(
        value => value.attributeName === 'data-readable-color'
      );
      if (shouldIgnore) return;

      throttledSetColor();
    });
    observer.observe(el, {
      attributes: true,
      childList: false,
      subtree: false
    });
    observers.set(el, observer);
    el.addEventListener('mouseenter', throttledSetColor);
    el.addEventListener('mouseleave', throttledSetColor);
    el.addEventListener('focus', throttledSetColor);
    el.addEventListener('blur', throttledSetColor);
    el.addEventListener('transitionend', throttledSetColor);
  },

  unmounted(el) {
    const observer = observers.get(el);
    observer?.unobserve?.(el);
    observers.delete(el);
  }
};
