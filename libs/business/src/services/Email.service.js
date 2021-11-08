import { BaseCRUDService } from './BaseCRUD.service';

export class EmailService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/mails';
  }
}
