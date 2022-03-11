import { BaseModel } from './Base.model';
import { User } from './User.model';

export class RecommendedUser extends BaseModel {
  constructor(...args) {
    super(...args);
    this.user = new User(this.user);
  }
}
