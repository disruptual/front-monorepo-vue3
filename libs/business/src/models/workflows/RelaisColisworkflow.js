import AbstractWorkflow from './BaseWorkflow';
import { ORDER_DELIVERY_STATES, ORDER_STATES } from '../../enums/order.enums';

export default class RelaisColisWorkflow extends AbstractWorkflow {
  get canSelectRelay() {
    if (!this.isSeller) return false;

    const hasEtiquette =
      this.order.deliveryDetail &&
      this.order.deliveryDetail.buyerDeliveryFormUrl;

    return (
      !hasEtiquette &&
      [ORDER_DELIVERY_STATES.START].includes(this.order.deliveryState)
    );
  }

  get canPrintEtiquette() {
    if (!this.isSeller) return false;

    const hasSelectedRelay =
      this.order.deliveryDetail && this.order.deliveryDetail.depositRelay;
    if (!hasSelectedRelay) return false;

    return (
      this.order.orderState === ORDER_STATES.ORDER_ACCEPTED ||
      [
        ORDER_DELIVERY_STATES.START,
        ORDER_DELIVERY_STATES.DEPOSIT_IN_RELAY_BY_SELLER_IN_PROGRESS
      ].includes(this.order.deliveryState)
    );
  }
}
