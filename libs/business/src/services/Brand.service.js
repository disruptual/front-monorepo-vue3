import { BaseCRUDService } from './BaseCRUD.service';

export class BrandService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/brands';
  }
}
