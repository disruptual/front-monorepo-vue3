import { BaseModel } from './Base.model';
import { Item } from './Item.model';

export class OrderItem extends BaseModel {
  static get relations() {
    return [{ name: 'item', getUri: entity => entity._item, model: Item }];
  }
}
