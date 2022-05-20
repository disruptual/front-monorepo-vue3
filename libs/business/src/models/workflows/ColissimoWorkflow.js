import { ORDER_DELIVERY_STATES } from '../../enums/order.enums';
import AbstractWorkflow from './BaseWorkflow';

export default class ColissimoWorkflow extends AbstractWorkflow {
  get canReceive() {
    return (
      !this.isSeller && this.order.orderState === ORDER_DELIVERY_STATES.SENT
    );
  }
}
