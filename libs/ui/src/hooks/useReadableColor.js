import { computed, unref } from 'vue';
import { readableColor } from 'polished';

export const useReadableColor = bgColorName => {
  const rootStyle = document.documentElement.style;

  return computed(() => {
    const dark = rootStyle.getPropertyValue('--color-text');
    const light = rootStyle.getPropertyValue('--color-text-lighter');

    const normalizedBg = unref(bgColorName)
      .replace('var(', '')
      .replace(')', '');
    const bg = rootStyle.getPropertyValue(unref(normalizedBg));

    return readableColor(bg, dark, light);
  });
};
