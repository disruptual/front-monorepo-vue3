export const HTTP_VERBS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};

export const ENVIRONMENTS = {
  LOCAL: 'local',
  SANDBOX: 'sandbox',
  PREPROD: 'preprod',
  PROD: 'prod'
};

export const PROVIDER_KEYS = {
  APP: 'APP',
  AUTH_SERVICE: 'AUTH_SERVICE',
  HTTP_SERVICE: 'HTTP_SERVICE',
  VUE_QUERY_CLIENT: 'VUE_QUERY_CLIENT'
};

export const ONE_DAY = 1000 * 60 * 60 * 24;

export const SSO_STRATEGIES = {
  COOKIE: 'cookie',
  WEBVIEW: 'function',
  QUERY_PARAM: 'query_param',
  IN_APP: 'inApp',
  OAUTH: 'oAuth'
};

export const SSO_URLS = {
  LOGIN: '/sso/login',
  USER: '/sso/user',
  REFRESH: '/sso/refresh_token',
  RESET_PASSWORD: '/sso/user/lost-password',
  SSO_TOKEN: '/sso/token'
};

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc'
};

export const CURRENCIES = {
  EURO: '€'
};
