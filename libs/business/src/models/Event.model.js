import { BaseModel } from './Base.model';
import frLocale from 'date-fns/locale/fr';
import { format as formatDate, isWithinInterval, isAfter } from 'date-fns';
import { SLASH_DATE_FORMAT } from '../utils/constants';
import { Category } from './Category.model';

export class Event extends BaseModel {
  constructor(...args) {
    super(...args);

    this.categories = this.categories.map(c => new Category(c));
  }
  get isDigitalPeriod() {
    return this.isNowInInterval(
      new Date(this.digitalSubmissionStartAt),
      new Date(this.digitalSubmissionEndAt)
    );
  }
  get isPhysicalPeriod() {
    return this.isNowInInterval(
      new Date(this.physicalSubmissionStartAt),
      new Date(this.physicalSubmissionEndAt)
    );
  }
  get isSalesPeriod() {
    return this.isNowInInterval(
      new Date(this.salesStartAt),
      new Date(this.salesEndAt)
    );
  }

  get hasStarted() {
    const now = Date.now();
    return isAfter(now, new Date(this.startAt));
  }

  get isFinished() {
    if (!this.hasStarted) return false;
    return (
      !this.isDigitalPeriod && !this.isPhysicalPeriod && !this.isSalesPeriod
    );
  }

  get isInProgress() {
    if (
      !this.isFinished &&
      this.hasStarted &&
      (this.isDigitalPeriod || this.isPhysicalPeriod || this.isSalesPeriod)
    )
      return true;
    return false;
  }

  get dateFormatStartAt() {
    return new Date(this.startAt);
  }
  get dateFormatEndAt() {
    return new Date(this.endAt);
  }

  get dateFormatPhysicalSubmissionStartAt() {
    return new Date(this.physicalSubmissionStartAt);
  }
  get dateFormatPhysicalSubmissionEndAt() {
    return new Date(this.physicalSubmissionEndAt);
  }

  get dateFormatDigitalSubmissionStartAt() {
    return new Date(this.digitalSubmissionStartAt);
  }
  get dateFormatDigitalSubmissionEndAt() {
    return new Date(this.digitalSubmissionEndAt);
  }

  get dateFormatSalesStartAt() {
    return new Date(this.salesStartAt);
  }
  get dateFormatSalesEndAt() {
    return new Date(this.salesEndAt);
  }

  isNowInInterval(start, end) {
    return isWithinInterval(new Date(), { start, end });
  }

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

  formatPhysicalSubmissionStartAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.physicalSubmissionStartAt), format, {
      locale: frLocale
    });
  }

  formatPhysicalSubmissionEndAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.physicalSubmissionEndAt), format, {
      locale: frLocale
    });
  }

  formatDigitalSubmissionStartAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.digitalSubmissionStartAt), format, {
      locale: frLocale
    });
  }

  formatDigitalSubmissionEndAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.digitalSubmissionEndAt), format, {
      locale: frLocale
    });
  }

  formatSalesStartAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.salesStartAt), format, {
      locale: frLocale
    });
  }

  formatSalesEndAt(format = SLASH_DATE_FORMAT) {
    return formatDate(new Date(this.salesEndAt), format, {
      locale: frLocale
    });
  }
}
