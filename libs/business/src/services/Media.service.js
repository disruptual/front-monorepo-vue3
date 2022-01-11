import { BaseCRUDService } from './BaseCRUD.service';

export class MediaService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/media';
  }
}
