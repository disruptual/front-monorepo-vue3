import { BaseCRUDService } from './BaseCRUD.service';

export class DeliveryPriceService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/delivery_package_deliveries';
  }
}
