import {
  ORDER_DELIVERY_STATES,
  DELIVERY_MODES,
  ORDER_PROBLEM_STATES,
  ORDER_PROBLEM_STATE_TRANSITIONS
} from '../enums';

export class OrderStatus {
  constructor(order) {
    this.order = order;
  }

  shouldUseOrderStateTransition() {
    if (
      this.order.isCancelled &&
      this.order.deliveryState === ORDER_DELIVERY_STATES.START
    ) {
      return true;
    }

    if (
      this.order.isEnded &&
      this.orderproblemState === ORDER_PROBLEM_STATES.NONE &&
      this.orderproblemStateTransition === ORDER_PROBLEM_STATE_TRANSITIONS.NONE
    ) {
      return true;
    }

    return false;
  }

  shouldUseProblemState() {
    return this.order.hasProblem;
  }

  shouldUseProblemStateTransition() {
    return (
      this.order.isEnded &&
      this.order.problemStateTransition ===
        ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_BY_USERS
    );
  }

  shouldUseDeliveryState() {
    return this.order.orderState === ORDER_DELIVERY_STATES.DELIVERY_IN_PROGRESS;
  }

  shouldUseDeliveryStateTransition() {
    return false;
  }

  getValue() {
    if (!this.order.delivery) {
      return null;
    }

    if (this.shouldUseOrderStateTransition()) {
      return this.order.orderStateTransition;
    }

    if (this.shouldUseProblemState()) {
      return this.order.problemState;
    }

    if (this.shouldUseProblemStateTransition()) {
      return this.order.problemStateTransition;
    }

    if (this.shouldUseDeliveryStateTransition()) {
      return this.order.deliveryStateTransition;
    }

    if (this.shouldUseDeliveryState()) {
      return this.order.deliveryState;
    }

    return this.order.orderState;
  }
}
