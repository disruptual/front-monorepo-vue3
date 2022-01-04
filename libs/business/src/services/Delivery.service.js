import { BaseCRUDService } from './BaseCRUD.service';

export class DeliveryService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/deliveries';
  }
}
