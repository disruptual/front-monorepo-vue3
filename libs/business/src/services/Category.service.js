import { BaseCRUDService } from './BaseCRUD.service';

export class CategoryService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/categories';
  }

  findBySlug(slug, options) {
    return this._http.get(`${this.endpoint}/slug/${slug}`, options);
  }
}
