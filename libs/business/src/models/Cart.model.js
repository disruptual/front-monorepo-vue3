import { BaseModel } from './Base.model';
import { CartItem } from './CartItem.model';
import { User } from './User.model';

export class Cart extends BaseModel {
  static get relations() {
    return [
      { name: 'cartItems', getUri: entity => entity._colors, model: CartItem },
      { name: 'user', getUri: entity => entity._user, model: User },
      { name: 'seller', getUri: entity => entity._seller, model: User }
    ];
  }
}
