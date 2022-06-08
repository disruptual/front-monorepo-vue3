import AbstractWorkflow from './BaseWorkflow';
import { ORDER_DELIVERY_STATES, ORDER_STATES } from '../../enums/order.enums';

export default class MondialRelayWorkflow extends AbstractWorkflow {
  get canPrintEtiquette() {
    if (!this.isSeller) return false;

    return (
      this.order.orderState === ORDER_STATES.ORDER_ACCEPTED ||
      this.order.deliveryState ===
        ORDER_DELIVERY_STATES.DEPOSIT_PACKAGE_IN_PROGRESS
    );
  }
}
