import { BaseModel } from './Base.model';
import { User } from './User.model';

export class Address extends BaseModel {
  static get relations() {
    return [
      {
        name: 'user',
        getUri: entity => entity._user,
        model: User
      }
    ];
  }
}
