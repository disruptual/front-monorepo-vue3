import { BaseCRUDService } from './BaseCRUD.service';

export class VoucherService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/vouchers';
  }
}
