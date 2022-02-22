import { BaseCRUDService } from './BaseCRUD.service';

export class CmsPageService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/pages';
  }

  findBySlug(slug, options) {
    return this._http.get(`${this.endpoint}/slug/${slug}`, options);
  }
}
