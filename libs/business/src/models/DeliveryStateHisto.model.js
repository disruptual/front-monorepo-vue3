import { BaseModel } from './Base.model';
import { ORDER_PROBLEM_STATES } from '../enums/order.enums';

export class DeliveryStateHisto extends BaseModel {
  get state() {
    return this.deliveryState;
  }

  get transition() {
    return this.deliveryTransition;
  }

  get status() {
    if (this.problemState === ORDER_PROBLEM_STATES.NONE) return this.transition;

    return this.problemStateTransition;
  }
}
