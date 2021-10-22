export const oneOf = (values, defaultValue) => {
  return {
    type: values[0].constructor,
    required: !defaultValue,
    validator: val => {
      return values.includes(val);
    },
    default: defaultValue
  };
};
