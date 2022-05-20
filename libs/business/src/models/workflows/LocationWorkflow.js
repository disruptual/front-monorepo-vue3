import AbstractWorkflow from './BaseWorkflow';
import { ORDER_DELIVERY_STATES, ORDER_STATES } from '../../enums/order.enums';
import { LOCATION_CHECK_TYPES } from '../../enums';

export default class LocationWorkflow extends AbstractWorkflow {
  get canPrintEtiquette() {
    if (this.locationCheckType !== LOCATION_CHECK_TYPES.PDF) return false;
    if (!this.isSeller) return false;

    return (
      this.order.orderState === ORDER_STATES.ORDER_ACCEPTED ||
      this.order.deliveryState ===
        ORDER_DELIVERY_STATES.DEPOSIT_PACKAGE_IN_PROGRESS
    );
  }

  get canShowQrcode() {
    if (this.locationCheckType !== LOCATION_CHECK_TYPES.QR_CODE) return false;
    if (!this.isSeller) return false;

    return [
      ORDER_STATES.ORDER_ACCEPTED,
      ORDER_STATES.DELIVERY_IN_PROGRESS
    ].includes(this.order.orderState);
  }
}
