
import { BaseCRUDService } from './BaseCRUD.service';

export class SuperCartService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/super_carts';
  }
}
