import { BaseCRUDService } from './BaseCRUD.service';

export class OrderAddressService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/order_addressses';
  }
}
