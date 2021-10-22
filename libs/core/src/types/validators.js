import * as types from './types';
import {
  isObject,
  isString,
  isNumber,
  isBoolean,
  isArray,
  isURL
} from '../utils/assertions';

const valuesAsCustomProperty =
  (prefix = '') =>
  val =>
    `var(--${prefix}-${val})`;

export const typeValidators = {
  [types.STRING](schema, value) {
    return isString(value);
  },
  [types.NUMBER](schema, value) {
    return isNumber(value);
  },
  [types.BOOLEAN](schema, value) {
    return isBoolean(value);
  },
  [types.ONE_OF](schema, value) {
    return schema.values.includes(value);
  },
  [types.SPACING](schema, value) {
    return schema.values
      .concat(schema.values.map(valuesAsCustomProperty('spacing')))
      .includes(value);
  },
  [types.FONT_FAMILY](schema, value) {
    return schema.values
      .concat(schema.values.map(valuesAsCustomProperty('font-family')))
      .includes(value);
  },
  [types.FONT_WEIGHT](schema, value) {
    return schema.values
      .concat(schema.values.map(valuesAsCustomProperty('font-weight')))
      .includes(value);
  },
  [types.FONT_SIZE](schema, value) {
    return schema.values
      .concat(schema.values.map(valuesAsCustomProperty('font-size')))
      .includes(value);
  },
  [types.BOX_SHADOW](schema, value) {
    return schema.values
      .concat(schema.values.map(valuesAsCustomProperty('box-shadow')))
      .includes(value);
  },
  [types.ARRAY_OF](schema, values) {
    return values.every(value => schema.values.includes(value));
  },
  [types.COLOR](schema, value) {
    return isString(value);
  },
  [types.URL](schema, value) {
    return isURL(value);
  },
  [types.ARRAY](schema, value) {
    if (!isArray(value)) return false;

    return value.every(val => typeValidators[schema.subtype](schema, val));
  },
  [types.OBJECT](schema, value) {
    return isObject(value);
  },
  [types.ICON](schema, value) {
    return isString(value) || value === null;
  },
  [types.COMPONENT_VARIANT](schema, value) {
    return Object.keys(schema.values).includes(value);
  }
};
