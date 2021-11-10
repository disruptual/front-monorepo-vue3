import { BaseCRUDService } from './BaseCRUD.service';

export class ContactService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/contacts';
  }
}
