
import { BaseCRUDService } from './BaseCRUD.service';

export class OrderProblemService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/order_problems';
  }
}
