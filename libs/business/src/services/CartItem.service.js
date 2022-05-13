import { BaseCRUDService } from './BaseCRUD.service';

export class CartItemService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/cart_items';
  }
}
