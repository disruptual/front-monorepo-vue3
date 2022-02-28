import { BaseCRUDService } from './BaseCRUD.service';

export class ReviewService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/reviews';
  }

  findAllByUserId(userId, options) {
    return this._http.get(`users/${userId}/reviews_tos`, options);
  }
}
