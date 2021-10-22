import * as types from './types';

const toCSSVariable = (value, prefix) => {
  // this is here for legacy purposes.
  if (value.startsWith('var') || value.startsWith('#')) return value;

  return `var(--${prefix}-${value})`;
};

export const transformers = {
  [types.STRING](value) {
    return value;
  },
  [types.NUMBER](value) {
    return value;
  },
  [types.BOOLEAN](value) {
    return value;
  },
  [types.ONE_OF](value) {
    return value;
  },
  [types.ARRAY_OF](values) {
    return values;
  },
  [types.URL](value) {
    return value;
  },
  [types.ARRAY](value) {
    return value;
  },
  [types.OBJECT](value) {
    return value;
  },
  [types.ICON](value) {
    return value;
  },
  [types.COLOR](value) {
    return toCSSVariable(value, 'color');
  },
  [types.FONT_FAMILY](value) {
    return toCSSVariable(value, 'font-family');
  },
  [types.FONT_SIZE](value) {
    return toCSSVariable(value, 'font-size');
  },
  [types.FONT_WEIGHT](value) {
    return toCSSVariable(value, 'font-weight');
  },
  [types.SPACING](value) {
    return toCSSVariable(value, 'spacing');
  },
  [types.BOX_SHADOW](value) {
    return toCSSVariable(value, 'box-shadow');
  },
  [types.COMPONENT_VARIANT](value, schema) {
    return schema.values[value];
  }
};
