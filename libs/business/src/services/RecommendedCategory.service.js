import { BaseCRUDService } from './BaseCRUD.service';
import { Category } from '@dsp/business';

export class RecommendedCategoryService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/recommended_categories';
  }

  getTotalOfPublishItems(category) {
    if (category.id !== this.category.id) {
      return undefined;
    }
    return category.totalOfPublishItems;
  }
}
