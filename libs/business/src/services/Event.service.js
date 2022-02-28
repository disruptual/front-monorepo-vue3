import { BaseCRUDService } from './BaseCRUD.service';

export class EventService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/events';
  }
}
