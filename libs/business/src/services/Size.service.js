
import { BaseCRUDService } from './BaseCRUD.service';

export class SizeService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/sizes';
  }
}
