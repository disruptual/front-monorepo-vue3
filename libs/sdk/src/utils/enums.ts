import { IBaseEntity } from '@/interfaces/base-entity.interface';

export enum httpVerbs {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export enum endpoints {
  USERS = '/users',
  LOGIN = '/login',
  REFRESH_TOKEN = '/token/refresh',
  SSO_LOGIN = '/sso/login',
  CARTS = '/carts',
  CART_ITEMS = '/cart_items'
}
