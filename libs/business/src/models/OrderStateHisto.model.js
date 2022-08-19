import { BaseModel } from './Base.model';
import {
  ORDER_DELIVERY_STATES,
  ORDER_DELIVERY_STATE_TRANSITIONS,
  ORDER_STATES,
  ORDER_PROBLEM_STATES,
  ORDER_STATE_TRANSITIONS,
  ORDER_PROBLEM_STATE_TRANSITIONS,
  ORDER_DELAYS
} from '../enums/order.enums';
import { format, addHours } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

export class OrderStateHisto extends BaseModel {
  get isEnded() {
    return this.orderState === ORDER_STATES.END;
  }
  get isCancelled() {
    return (
      this.isEnded &&
      ([
        ORDER_STATE_TRANSITIONS.CANCEL,
        ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC,
        ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_DISTRIBUTED,
        ORDER_STATE_TRANSITIONS.LOST_PACKAGE,
        ORDER_STATE_TRANSITIONS.SELLER_RECOVERY,
        ORDER_STATE_TRANSITIONS.TO_GIVE_TO_AN_ASSOCIATION
      ].includes(this.orderStateTransition) ||
        [
          ORDER_DELIVERY_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED,
          ORDER_DELIVERY_STATE_TRANSITIONS.STORE_REFUSE,
          ORDER_DELIVERY_STATE_TRANSITIONS.STORE_TO_STORE_LOST_PACKAGE_BEFORE_TRANSIT,
          ORDER_DELIVERY_STATE_TRANSITIONS.STORE_LOSE_PACKAGE,
          ORDER_DELIVERY_STATE_TRANSITIONS.BUYER_IN_STORE_REFUSE,
          ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERY_CANCELLED
        ].includes(this.deliveryStateTransition))
    );
  }

  get isFinished() {
    return (
      this.isEnded &&
      ([
        ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_ORDER_ACCEPTED,
        ORDER_STATE_TRANSITIONS.VALIDATION_BY_ORDER_ACCEPTED,
        ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_ACCEPT,
        ORDER_STATE_TRANSITIONS.DELIVERY_COMPLETED
      ].includes(this.orderStateTransition) ||
        [
          ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_SENT,
          ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED,
          ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_BY_SENT,
          ORDER_DELIVERY_STATE_TRANSITIONS.VALIDATION_BY_DELIVERED,
          ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERY_BY_SENT,
          ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERY
        ].includes(this.deliveryStateTransition))
    );
  }

  get isSolvedProblem() {
    return [
      ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_BY_CUSTOMER_SERVICE,
      ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_AUTOMATICALLY,
      ORDER_PROBLEM_STATE_TRANSITIONS.PROBLEM_IS_SOLVED_BY_USERS
    ].includes(this.problemStateTransition);
  }

  get state() {
    return this.orderState;
  }

  get transition() {
    return this.orderStateTransition;
  }

  get status() {
    if (this.isCancelled) return this.orderStateTransition;
    if (this.isFinished) return this.orderState;
    if (this.isSolvedProblem) return this.problemStateTransition;

    if (this.problemState === ORDER_PROBLEM_STATES.NONE) return this.transition;

    return this.problemStateTransition;
  }

  get hasProblem() {
    return this.problemState !== ORDER_PROBLEM_STATES.NONE;
  }

  isRollbackable(order) {
    const disabledTransitions = [
      ORDER_STATE_TRANSITIONS.ORDERED,
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED,
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_ORDER_ACCEPTED,
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_SENT,
      ORDER_STATE_TRANSITIONS.VALIDATION_BY_DELIVERED,
      ORDER_STATE_TRANSITIONS.VALIDATION_BY_SENT,
      ORDER_STATE_TRANSITIONS.VALIDATION_BY_ORDER_ACCEPTED,
      ORDER_STATE_TRANSITIONS.ORDER_ACCEPTANCE
    ];
    if (disabledTransitions.includes(this.orderStateTransition)) {
      return false;
    }

    if (
      order.isEnded ||
      order.hasProblem ||
      order.history.some(histo => histo.hasProblem) ||
      order.history.some(histo => histo.isEnded)
    ) {
      return false;
    }

    return true;
  }

  getMaxDate(delivery) {
    const delayInHours = ORDER_DELAYS[delivery.tag][this.state] || 0;
    const maxDate = addHours(new Date(this.created), delayInHours);
    return format(maxDate, 'dd/MM/yy à HH:mm', {
      locale: frLocale
    });
  }
}
