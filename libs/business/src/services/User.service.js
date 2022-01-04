import { BaseCRUDService } from './BaseCRUD.service';

export class UserService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/users';
  }

  findBySlug(slug, options) {
    return this._http.get(`${this.endpoint}/slug/${slug}`, options);
  }

  mute(userId) {
    return this.update(userId, {
      silentModeActivatedAt: new Date()
    });
  }

  unmute(userId) {
    return this.update(userId, {
      silentModeActivatedAt: null
    });
  }

  anonymize(userId) {
    return this._http.put(`/users/${userId}/anonymize`);
  }

  anonymizeUser(userId) {
    return this._http.put(`${this.endpoint}/${userId}/anonymize`);
  }
}
