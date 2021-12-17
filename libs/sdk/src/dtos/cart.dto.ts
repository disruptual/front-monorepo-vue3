import { endpoints } from '@/utils/enums';
import { Maybe, URI } from '@/utils/types';
import { BaseDto } from './base.dto';

export type CartDto = BaseDto<endpoints.CARTS> & {
  user: URI<endpoints.USERS>;
  seller: URI<endpoints.USERS>;
  cartItems: URI<endpoints.CART_ITEMS>[];
  price: Maybe<number>;
};
