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
      this.order.delivery.tag === DELIVERY_MODES.LOCATION &&
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
    return [DELIVERY_MODES.RELAIS_COLIS, DELIVERY_MODES.COCOLIS].includes(
      this.order.delivery.tag
    );
  }

  shouldUseDeliveryStateTransition() {
    const transitions = [
      ORDER_DELIVERY_STATES.TRANSFER_TO_DESTINATION_RELAY_IN_PROGRESS,
      ORDER_DELIVERY_STATES.DELIVERY_IN_PROGRESS,
      ORDER_DELIVERY_STATES.END
    ];

    return transitions.includes(this.order.deliveryState);
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
