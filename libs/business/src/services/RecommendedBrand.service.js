import { BaseCRUDService } from './BaseCRUD.service';

export class RecommendedBrandService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/recommended_brands';
  }
}
