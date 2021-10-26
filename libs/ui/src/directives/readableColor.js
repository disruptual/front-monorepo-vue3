import { getReadableColor } from '@dsp/ui/utils/getReadableColor';

function setColor(el) {
  const computedStyle = window.getComputedStyle(el);

  el.style.color = getReadableColor(computedStyle.backgroundColor);
}

export const vReadableColor = {
  mounted(el) {
    setColor(el);

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
  }
};
