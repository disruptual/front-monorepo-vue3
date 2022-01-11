import { BaseCRUDService } from './BaseCRUD.service';

export class CarouselItemService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/carousel_items';
  }
}
