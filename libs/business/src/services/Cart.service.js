import { BaseCRUDService } from './BaseCRUD.service';

export class CartService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/carts';
  }
}
