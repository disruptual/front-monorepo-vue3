import { BaseCRUDService } from './BaseCRUD.service';

export class OrderService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/orders';
  }

  async findAllByUserId(userId, options) {
    return this._http.get(`users/${userId}/orders`, options);
  }
}
