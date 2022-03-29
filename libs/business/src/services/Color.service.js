import { BaseCRUDService } from './BaseCRUD.service';

export class ColorService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/colors';
  }
}
