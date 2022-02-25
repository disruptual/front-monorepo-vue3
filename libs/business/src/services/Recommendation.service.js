import { BaseCRUDService } from './BaseCRUD.service';

export class RecommendationService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.userEndpoint = '/recommended_users';
    this.brandEndpoint = '/recommended_brands';
    this.categoryEndpoint = '/recommended_categories';
  }

  findAllRecommendedUsers() {
    return this._http.get(`${this.userEndpoint}`);
  }

  createRecommendedUsers({ userId, position }) {
    return this._http.post(`${this.userEndpoint}`, {
      user: userId,
      position
    });
  }

  findAllRecommendedBrands() {
    return this._http.get(`${this.brandEndpoint}`);
  }

  createRecommendedBrands({ brandId, position }) {
    return this._http.post(`${this.brandEndpoint}`, {
      brand: brandId,
      position
    });
  }

  findAllRecommendedCategories() {
    return this._http.get(`${this.categoryEndpoint}`);
  }

  createRecommendedCategories({ categoryId, position }) {
    return this._http.post(`${this.categoryEndpoint}`, {
      brand: categoryId,
      position
    });
  }
}
