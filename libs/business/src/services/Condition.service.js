
import { BaseCRUDService } from './BaseCRUD.service';

export class ConditionService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/conditions';
  }
}
