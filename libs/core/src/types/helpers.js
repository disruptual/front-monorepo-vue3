import * as typePrimitives from './types';

export const types = {
  string(defaultValue) {
    return {
      type: typePrimitives.STRING,
      default: defaultValue,
      propType: String
    };
  },
  number(defaultValue) {
    return {
      type: typePrimitives.NUMBER,
      default: defaultValue,
      propType: Number
    };
  },
  boolean(defaultValue) {
    return {
      type: typePrimitives.BOOLEAN,
      default: defaultValue,
      propType: Boolean
    };
  },
  array(subtype, defaultValue) {
    return {
      type: typePrimitives.ARRAY,
      default: defaultValue,
      subtype,
      propType: Array
    };
  },
  object(shape) {
    return {
      type: typePrimitives.OBJECT,
      shape,
      propType: Object
    };
  },
  oneOf(values, defaultValue) {
    return {
      type: typePrimitives.ONE_OF,
      default: defaultValue,
      values,
      propType: null
    };
  },
  arrayOf(values, defaultValue) {
    return {
      type: typePrimitives.ARRAY_OF,
      default: defaultValue,
      values,
      propType: Array
    };
  },
  url(defaultValue) {
    return {
      type: typePrimitives.URL,
      default: defaultValue,
      propType: String
    };
  },
  color(defaultValue) {
    return {
      type: typePrimitives.COLOR,
      default: defaultValue,
      propType: String
    };
  },
  icon(defaultValue) {
    return {
      type: typePrimitives.ICON,
      default: defaultValue,
      propType: String
    };
  },
  fontFamily(defaultValue) {
    return {
      type: typePrimitives.FONT_FAMILY,
      default: defaultValue,
      propType: String
    };
  },
  fontSize(defaultValue) {
    return {
      type: typePrimitives.FONT_SIZE,
      default: defaultValue,
      values: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '3xl'],
      propType: String
    };
  },
  spacing(defaultValue) {
    return {
      type: typePrimitives.SPACING,
      default: defaultValue,
      values: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      propType: String
    };
  },
  fontWeight(defaultValue) {
    return {
      type: typePrimitives.FONT_WEIGHT,
      default: defaultValue,
      values: ['light', 'medium', 'semibold', 'bold', 'extrabold'],
      propType: String
    };
  },
  boxShadow(defaultValue) {
    return {
      type: typePrimitives.BOX_SHADOW,
      default: defaultValue,
      values: ['none', 'sm', 'md', 'lg'],
      propType: String
    };
  },
  componentVariant(values) {
    return {
      type: typePrimitives.COMPONENT_VARIANT,
      default: 'default',
      values,
      propType: String
    };
  }
};
