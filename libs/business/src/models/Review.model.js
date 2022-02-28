import { BaseModel } from './Base.model';
import { Order } from './Order.model';
import { User } from './User.model';

export class Review extends BaseModel {
  static get relations() {
    return [
      {
        name: 'order',
        getUri: entity => entity._order,
        model: Order
      },
      {
        name: 'sender',
        getUri: entity => entity._from,
        model: User
      },
      {
        name: 'sendee',
        getUri: entity => entity._to,
        model: User
      }
    ];
  }
}
