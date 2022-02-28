import { isDefined, isNumber, isString } from '@dsp/core';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const customValidator = (validator, errorMessage, options = {}) => ({
  handler: validator,
  message: errorMessage,
  ...options
});

const requiredValidator = val => isDefined(val) && val !== '';
const minValidator = (val, min) => isNumber(val) && val >= min;
const maxValidator = (val, max) => isNumber(val) && val <= max;
const minlengthValidator = (val, length) =>
  isString(val) && val.length >= length;
const maxlengthValidator = (val, length) =>
  isString(val) && val.length <= length;
const patternValidator = (val, regexp) => val && regexp.test(val);
const isInValidator = (val, acceptedValues) => acceptedValues.includes(val);
const isNotInValidator = (val, unallowedValues) =>
  !unallowedValues.includes(val);
const emailValidator = val => patternValidator(val, EMAIL_REGEX);

export const required = (errorMessage = 'form.errors.required') =>
  customValidator(requiredValidator, errorMessage);

export const min = (min, errorMessage = 'form.errors.min') =>
  customValidator(val => minValidator(val, min), errorMessage, { min });

export const max = (max, errorMessage = 'form.errors.max') =>
  customValidator(val => maxValidator(val, max), errorMessage, { max });

export const minlength = (length, errorMessage = 'form.errors.minlength') =>
  customValidator(val => minlengthValidator(val, length), errorMessage, {
    length
  });

export const maxlength = (length, errorMessage = 'form.errors.maxlength') =>
  customValidator(val => maxlengthValidator(val, length), errorMessage, {
    length
  });

export const pattern = (regexp, errorMessage = 'form.errors.pattern') =>
  customValidator(val => patternValidator(val, regexp), errorMessage);

export const isIn = (values, errorMessage = 'form.errors.isIn') =>
  customValidator(val => isInValidator(val, values), errorMessage, {
    values: values.join(',')
  });

export const isNotIn = (values, errorMessage = 'form.errors.isNotIn') =>
  customValidator(val => isNotInValidator(val, values), errorMessage, {
    values: values.join(',')
  });

export const email = (errorMessage = 'form.errors.email') =>
  customValidator(emailValidator, errorMessage);
