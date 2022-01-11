import { BaseCRUDService } from './BaseCRUD.service';

export class ItemService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/items';
  }

  async findAllByUserId(userId, options) {
    return this._http.get(`users/${userId}/items`, options);
  }

  search(options) {
    this._checkEndpoint();

    return this._http.get(`${this.endpoint}/search`, options);
  }

  async findAllByEventDigitalDepositedId(eventId, options) {
    return this._http.get(
      `/events/${eventId}/items?exists[eventPhysicalDepositedAt]=false`,
      options
    );
  }

  async findAllByEventPhysicalDepositedId(eventId, options) {
    return this._http.get(
      `/events/${eventId}/items?exists[eventPhysicalDepositedAt]=true`,
      options
    );
  }
}
