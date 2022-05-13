import { isObject } from '@dsp/core';
import { BaseModel } from './Base.model';
import { CartItem } from './CartItem.model';
import { User } from './User.model';

export class Cart extends BaseModel {
  static get relations() {
    return [
      {
        name: 'cartItems',
        getUri: entity =>
          // when the cart from a collection endpoint, ex: /user/:id/carts, the cartItems are just the uri
          // however when making an api call to get a single cart, ex: /carts/:id, we get the full cart item object
          entity._cartItems.map(cartItemOrUri => {
            if (isObject(cartItemOrUri)) return cartItemOrUri['@id'];

            return cartItemOrUri;
          }),
        model: CartItem
      },
      { name: 'user', getUri: entity => entity._user, model: User },
      { name: 'seller', getUri: entity => entity._seller, model: User }
    ];
  }
}
