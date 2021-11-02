import { BaseCRUDService } from './BaseCRUD.service';

export class OrderService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/orders';
  }

  async findAllByUserId(userId, options) {
    console.log('findallbyuserid');
    return this._http.get(`users/${userId}/orders`, options);
  }

  async findByOrderId(orderId, options) {
    console.log('findByOrderId');
    return this._http.get(`orders/${orderId}`, options);
  }
}
