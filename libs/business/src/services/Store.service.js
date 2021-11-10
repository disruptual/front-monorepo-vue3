import { BaseCRUDService } from './BaseCRUD.service';

export class StoreService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/locations';
  }
}
