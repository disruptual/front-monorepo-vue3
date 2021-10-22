import { BaseCRUDService } from './BaseCRUD.service';

export class UserService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/users';
  }

  findBySlug(slug, options) {
    return this._http.get(`${this.endpoint}/slug/${slug}`, options);
  }

  muteUser(userId) {
    return this.update(userId, {
      silentModeActivatedAt: new Date()
    });
  }

  unmuteUser(userId) {
    return this.update(userId, {
      silentModeActivatedAt: null
    });
  }

  anonymizeUser(userId) {
    return this._http.put(`${this.endpoint}/${userId}/anonymize`);
  }
}
