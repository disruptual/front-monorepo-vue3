import { ORDER_DELIVERY_STATES } from '../../enums/order.enums';
import AbstractWorkflow from './BaseWorkflow';

export default class HandWorkflow extends AbstractWorkflow {
  get canReceive() {
    return (
      !this.isSeller && this.order.deliveryState === ORDER_DELIVERY_STATES.SENT
    );
  }

  get canSend() {
    return (
      this.isSeller &&
      this.order.deliveryState === ORDER_DELIVERY_STATES.PACKING_IN_PROGRESS
    );
  }
}
