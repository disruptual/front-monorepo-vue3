import { BaseCRUDService } from './BaseCRUD.service';

export class CategoryService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/categories';
  }
}
