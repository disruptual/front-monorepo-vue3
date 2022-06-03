import { BaseCRUDService } from './BaseCRUD.service';

export class NotificationService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/notifications';
  }

  findAllByUserId(userId, options) {
    return this._http.get(`users/${userId}/notifications`, options);
  }
}
