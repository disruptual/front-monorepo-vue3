import { BaseModel } from './Base.model';
import { User } from './User.model';
import { OrderItem } from './OrderItem.model';
import { formatPrice } from '@dsp/core';

export class Order extends BaseModel {
  static get relations() {
    return [
      {
        name: 'seller',
        getUri: entity => entity._seller,
        model: User
      },
      {
        name: 'buyer',
        getUri: entity => entity._buyer,
        model: User
      },
      {
        name: 'orderItems',
        getUri: entity => `/orders/${entity.id}/order_items`,
        model: OrderItem
      }
    ];
  }

  get formatedPrice() {
    const price = this.totalPrice + this.serviceFeeAmount + this.deliveryPrice;

    return formatPrice(price);
  }
}
