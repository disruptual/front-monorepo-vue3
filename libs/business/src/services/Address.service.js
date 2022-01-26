import { BaseCRUDService } from './BaseCRUD.service';

export class AddressService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/addresses';
  }
}
