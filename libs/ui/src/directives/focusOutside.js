import { getFocusableChildren } from '@dsp/ui/utils/getFocusableChildren';

const listeners = new WeakMap();

export const vFocusOutside = {
  mounted(el, { value: cb }) {
    const listener = e => {
      const children = [...getFocusableChildren(el)];

      const { target } = e;
      if (target === children.at(-1)) {
        cb(e);
      }
    };

    listeners.set(el, listener);
    window.addEventListener('focusout', listener);
  },

  unmounted(el) {
    const listener = listeners.get(el);
    window.removeEventListener('focusout', listener);
    listeners.delete(el);
  }
};
