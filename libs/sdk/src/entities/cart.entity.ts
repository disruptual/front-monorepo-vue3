import { CartDto } from '@/dtos/cart.dto';
import { endpoints } from '@/utils/enums';
import { Maybe, URI } from '@/utils/types';
import { BaseEntity } from './base.entity';

export class Cart extends BaseEntity<endpoints.CARTS> {
  public cartItems: URI<endpoints.CART_ITEMS>[];

  public user: URI<endpoints.USERS>;

  public seller: URI<endpoints.USERS>;

  public price: Maybe<number>;

  constructor(dto: CartDto) {
    super(dto);

    this.cartItems = dto.cartItems;
    this.user = dto.user;
    this.seller = dto.seller;
    this.price = dto.price;
  }
}
