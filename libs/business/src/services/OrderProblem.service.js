import { BaseCRUDService } from './BaseCRUD.service';

export class OrderProblemService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/order_problems';
  }

  solveById(id, data) {
    return this._http.put(`${this.endpoint}/${id}/solve`, { data });
  }
}
