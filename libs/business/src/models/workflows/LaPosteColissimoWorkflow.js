import { ORDER_DELIVERY_STATES, ORDER_STATES } from '../../enums/order.enums';
import AbstractWorkflow from './BaseWorkflow';

export default class LaPosteColissimoWorkflow extends AbstractWorkflow {
  get canPrintEtiquette() {
    if (!this.isSeller) return false;

    if (!this.hasChosenTypeOfSending() && !this.hasExpeditionNumber())
      return false;

    return (
      this.order.orderState === ORDER_STATES.ORDER_ACCEPTED ||
      this.order.deliveryState ===
        ORDER_DELIVERY_STATES.DEPOSIT_TO_COLLECTION_POINT_IN_PROGRESS
    );
  }

  get canReceive() {
    return (
      !this.isSeller && this.order.orderState === ORDER_DELIVERY_STATES.SENT
    );
  }

  get canSetColissimoDetails() {
    return (
      this.isSeller &&
      this.order.isAccepted &&
      !this.hasExpeditionNumber() &&
      !this.hasChosenTypeOfSending()
    );
  }

  hasExpeditionNumber() {
    return Boolean(
      this.order.deliveryDetail && this.order.deliveryDetail.expeditionNum
    );
  }

  hasChosenTypeOfSending() {
    return Boolean(
      this.workflowOptions &&
        this.workflowOptions.colissimoTypeOfSendingHasChosen
    );
  }
}
