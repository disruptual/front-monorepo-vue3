import { BaseCRUDService } from './BaseCRUD.service';

export class RecommendedUserService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/recommended_users';
  }
}
