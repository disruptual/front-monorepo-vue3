import { BaseCRUDService } from './BaseCRUD.service';

export class LocationService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/locations';
  }
}
