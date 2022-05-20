import { ORDER_DELIVERY_STATES, ORDER_STATES } from '../../enums/order.enums';
import AbstractWorkflow from './BaseWorkflow';

export default class ColissimoCourrierSuiviWorkflow extends AbstractWorkflow {
  get canPrintEtiquette() {
    if (!this.isSeller) return false;

    return (
      this.order.orderState === ORDER_STATES.ORDER_ACCEPTED ||
      this.order.deliveryState ===
        ORDER_DELIVERY_STATES.DEPOSIT_IN_MAILBOX_BY_SELLER_IN_PROGRESS
    );
  }

  get canReceive() {
    return (
      !this.isSeller && this.order.orderState === ORDER_DELIVERY_STATES.SENT
    );
  }
}
