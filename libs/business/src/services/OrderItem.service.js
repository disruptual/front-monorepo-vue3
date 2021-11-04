import { BaseCRUDService } from './BaseCRUD.service';

export class OrderItemService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/items';
  }

  async findAllByOrderId(orderId, options) {
    return this._http.get(`orders/${orderId}/order_items`, options);
  }
}
