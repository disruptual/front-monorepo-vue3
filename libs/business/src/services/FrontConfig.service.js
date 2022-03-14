import { BaseCRUDService } from './BaseCRUD.service';

export class FrontConfigService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/front_configs';
  }
}
