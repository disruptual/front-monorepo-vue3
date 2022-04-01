import { BaseModel } from './Base.model';
import { User } from './User.model';

export class RecommendedUser extends BaseModel {
  constructor(...args) {
    super(...args);
    if (this.user) {
      this.user = new User(this.user);
    }
  }
}
