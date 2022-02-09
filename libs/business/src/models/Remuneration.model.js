import { BaseModel } from './Base.model';
import { REMUNERATION_NAMES } from '../enums';

export class Remuneration extends BaseModel {
  get isGiftCard() {
    return this.remunerationName === REMUNERATION_NAMES.GIFTCARD;
  }

  get isCash() {
    return this.remunerationName === REMUNERATION_NAMES.CASH;
  }
}
