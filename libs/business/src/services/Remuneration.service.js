import { BaseCRUDService } from './BaseCRUD.service';

export class RemunerationService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/remunerations';
  }
}
