import { BaseModel } from './Base.model';
import { User } from './User.model';
import frLocale from 'date-fns/locale/fr';
import { format as formatDate } from 'date-fns';
import { SLASH_DATE_FORMAT } from '../utils/constants';

export class Voucher extends BaseModel {
  static get relations() {
    return [
      {
        name: 'user',
        getUri: entity => entity.user,
        model: User
      }
    ];
  }
  formatCreatedAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.createdAt), format, {
      locale: frLocale
    });
  }
  formatValidatedAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.validatedAt), format, {
      locale: frLocale
    });
  }
}
