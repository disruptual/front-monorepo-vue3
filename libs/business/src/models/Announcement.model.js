import { BaseModel } from './Base.model';
import frLocale from 'date-fns/locale/fr';
import { format as formatDate } from 'date-fns';
import { SLASH_DATE_FORMAT } from '../utils/constants';

export class Announcement extends BaseModel {
  formatStartAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.startAt), format, {
      locale: frLocale
    });
  }

  formatEndAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.endAt), format, {
      locale: frLocale
    });
  }

  get startDate() {
    if (!this.startAt) return null;

    return new Date(this.startAt);
  }

  get endDate() {
    if (!this.endAt) return null;

    return new Date(this.endAt);
  }
}
