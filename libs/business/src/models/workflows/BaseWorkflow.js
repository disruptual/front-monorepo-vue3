import Order from '../Order';
import { ORDER_DELIVERY_STATES, ORDER_STATES } from '../../enums/order.enums';
import { ORDER_ACTIONS } from '../../enums/order.enums';

export default class AbstractWorkflow {
  constructor({
    order,
    isSeller,
    locationCheckType,
    hasReview,
    workflowOptions
  }) {
    this.order = order;
    this.isSeller = isSeller;
    this.locationCheckType = locationCheckType;
    this.hasReview = hasReview;
    this.workflowOptions = workflowOptions;
  }

  get canCancel() {
    return this.isSeller && this.order.orderState === ORDER_STATES.ORDERED;
  }

  get canConfirm() {
    return this.isSeller && this.order.orderState === ORDER_STATES.ORDERED;
  }

  get canSend() {
    return false;
  }

  get canSelectRelay() {
    return false;
  }

  get canPrintEtiquette() {
    return false;
  }
  get canShowQrcode() {
    return false;
  }

  get canReceive() {
    return false;
  }

  get canValidate() {
    if (this.isSeller || this.order.hasProblem || this.order.hasDispute) {
      return false;
    }
    return (
      this.order.deliveryState === ORDER_DELIVERY_STATES.DELIVERED ||
      this.order.deliveryState ===
        ORDER_DELIVERY_STATES.PACKAGE_VALIDATION_BY_BUYER_IN_PROGRESS
    );
  }

  get canOfferRefund() {
    return this.isSeller && this.order.hasProblem;
  }

  get canAcceptRefund() {
    return !this.isSeller && this.order.hasProblem && this.order.refundAmount;
  }

  get canRefuseRefund() {
    return !this.isSeller && this.order.hasProblem;
  }

  get canReview() {
    return this.order.isFinished && !this.hasReview;
  }

  get canSetColissimoDetails() {
    return false;
  }

  getActions() {
    return [
      this.canCancel && ORDER_ACTIONS.CANCEL_BY_SELLER,
      this.canConfirm && ORDER_ACTIONS.CONFIRM_BY_SELLER,
      this.canSend && ORDER_ACTIONS.MARK_AS_SENT,
      this.canSelectRelay && ORDER_ACTIONS.SELECT_RELAY,
      this.canPrintEtiquette && ORDER_ACTIONS.PRINT_ETIQUETTE,
      this.canShowQrcode && ORDER_ACTIONS.SHOW_QRCODE,
      this.canReceive && ORDER_ACTIONS.MARK_AS_RECEIVED,
      this.canValidate && ORDER_ACTIONS.VALIDATE_BY_BUYER,
      this.canValidate && ORDER_ACTIONS.INVALIDATE_BY_BUYER,
      this.canAcceptRefund && ORDER_ACTIONS.MANAGE_REFUND_BY_BUYER,
      this.canOfferRefund && ORDER_ACTIONS.OFFER_REFUND_BY_SELLER,
      this.canAcceptRefund && ORDER_ACTIONS.ACCEPT_REFUND_BY_BUYER,
      this.canRefuseRefund && ORDER_ACTIONS.REFUSE_REFUND_BY_BUYER,
      this.canReview && ORDER_ACTIONS.GIVE_REVIEW,
      this.canSetColissimoDetails &&
        ORDER_ACTIONS.SELECT_TYPE_OF_SENDING_BY_SELLER
    ].filter(Boolean);
  }
}
