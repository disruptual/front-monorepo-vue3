import { BaseCRUDService } from './BaseCRUD.service';

export class AnnouncementService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/blocs';
  }
}
