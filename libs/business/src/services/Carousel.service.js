import { BaseCRUDService } from './BaseCRUD.service';

export class CarouselService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/carousels';
  }
}
