import { unref } from 'vue';
import { isObject } from './assertions';

import { isUndefinedOrNull } from './assertions';
import { ENVIRONMENTS, CURRENCIES } from './constants';

export const cloneInstance = instance => {
  return Object.assign(
    Object.create(Object.getPrototypeOf(instance)),
    instance
  );
};

export const extractIdFromUri = uri => {
  const match = /\/[^/]+\/(.*)/.exec(uri);
  if (match && match.length === 2) {
    return match[1];
  }

  return uri;
};

export const getCookies = () =>
  Object.fromEntries(
    document.cookie.split(';').map(cookie => cookie.replace(' ', '').split('='))
  );

export const removeCookie = cookieName => {
  document.cookie = `${cookieName}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
};

export function kebabToCamelCase(str) {
  return str.replace(/(-\w)/g, match => match[1].toUpperCase());
}

export const camelToKebabCase = str =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export const upperCaseFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.substring(1);

export const isLocal = import.meta.env.VITE_ENV === ENVIRONMENTS.LOCAL;
export const isSandbox = import.meta.env.VITE_ENV === ENVIRONMENTS.SANDBOX;
export const isPreprod = import.meta.env.VITE_ENV === ENVIRONMENTS.PREPROD;
export const isProd = import.meta.env.VITE_ENV === ENVIRONMENTS.PROD;

export const noop = () => {};

export const formatPrice = (
  price = 0,
  { digits = 2, currency = CURRENCIES.EURO } = {}
) => {
  const number = Number.parseFloat(price);
  const isDecimal = (number * 100) % 100 > 0;
  if (isDecimal) return `${number.toFixed(digits).replace('.', ',')}€`;
  else return `${String(number).replace('.', ',')}€`;
};

export const makeRandomId = (length = 6) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const serializeQueryString = (obj = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (isUndefinedOrNull(value)) return;

    searchParams.append(key, value);
  });

  return searchParams.toString();
};

export const range = n => [...Array(n).keys()];

export const deepUnref = maybeRef => {
  const result = unref(maybeRef);
  if (!isObject(result)) return result;

  return Object.fromEntries(
    Object.entries(result).map(([key, value]) => [key, deepUnref(value)])
  );
};
