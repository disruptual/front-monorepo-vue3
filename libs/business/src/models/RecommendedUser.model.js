import { BaseModel } from './Base.model';
export class RecommendedUser extends BaseModel {
  constructor(...args) {
    super(...args);
    this.formatModel();
  }

  formatModel() {
    if (this.user) {
      let id = this.id;
      Object.assign(this, this.user);
      this.id = id;
      this.userId = this.user.id;
      delete this.user;
    }
  }
}
