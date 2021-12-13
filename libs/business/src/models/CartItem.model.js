import { BaseModel } from './Base.model';
import { Item } from './Item.model';

export class CartItem extends BaseModel {
  static get relations() {
    return [{ name: 'item', getUri: entity => entity.item, model: Item }];
  }
}
