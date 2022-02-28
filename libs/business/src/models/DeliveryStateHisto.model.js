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
    return this.transition ?? this.state;
  }

  isRollbackable(order) {
    return false;
  }
}
