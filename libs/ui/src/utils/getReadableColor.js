import { readableColor } from 'polished';

export const TRANSPARENT_VALUES = ['transparent', 'rgba(0, 0, 0, 0)'];
const rootStyle = document.documentElement.style;

const isCssVariable = string =>
  string.startsWith('--') || string.startsWith('var(');

export const getCssVarValue = cssVar => {
  const normalizedValue = cssVar.replace('var(', '').replace(')', '');
  const value = rootStyle.getPropertyValue(normalizedValue);

  return isCssVariable(value) ? getCssVarValue(value) : value;
};

export const getReadableColor = color => {
  const dark = getCssVarValue('--color-text');
  const light = getCssVarValue('--color-text-lighter');

  const bg = isCssVariable(color) ? getCssVarValue(color) : color;

  if (TRANSPARENT_VALUES.includes(bg)) return null;
  return readableColor(bg, dark, light);
};
