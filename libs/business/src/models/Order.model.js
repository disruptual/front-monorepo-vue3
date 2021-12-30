import { BaseModel } from './Base.model';
import { User } from './User.model';
import { OrderItem } from './OrderItem.model';
import { formatPrice } from '@dsp/core';
import {
  ORDER_STATE_TRANSITIONS,
  ORDER_STATES,
  ORDER_PROBLEM_STATES,
  DELIVERY_MODES
} from '../enums';
import { OrderStatus } from './OrderStatus.model';
import { Delivery } from './Delivery.model';
import { Remuneration } from './Remuneration.model';
import { Store } from './Store.model';

export class Order extends BaseModel {
  static get relations() {
    return [
      {
        name: 'seller',
        getUri: entity => entity._seller,
        model: User
      },
      {
        name: 'buyer',
        getUri: entity => entity._buyer,
        model: User
      },
      {
        name: 'orderItems',
        getUri: entity => `/orders/${entity.id}/order_items`,
        model: OrderItem
      },
      {
        name: 'delivery',
        getUri: entity => entity._delivery,
        model: Delivery
      },
      {
        name: 'remuneration',
        getUri: entity => entity._remuneration,
        model: Remuneration
      },
      {
        name: 'location',
        getUri: entity => entity._location,
        model: Store
      }
    ];
  }

  get formatedPrice() {
    const price = this.totalPrice + this.serviceFeeAmount + this.deliveryPrice;

    return formatPrice(price);
  }

  get isEnded() {
    return this.orderState === ORDER_STATES.END;
  }

  get isCancelled() {
    return (
      this.isEnded &&
      [
        ORDER_STATE_TRANSITIONS.CANCEL,
        ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC,
        ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_ORDER_ACCEPTED,
        ORDER_STATE_TRANSITIONS.CANCEL_AUTOMATIC_BY_DISTRIBUTED,
        ORDER_STATE_TRANSITIONS.LOST_PACKAGE,
        ORDER_STATE_TRANSITIONS.SELLER_RECOVERY,
        ORDER_STATE_TRANSITIONS.TO_GIVE_TO_AN_ASSOCIATION,
        ORDER_STATE_TRANSITIONS.STORE_REFUSE,
        ORDER_STATE_TRANSITIONS.STORE_TO_STORE_LOST_PACKAGE_BEFORE_TRANSIT,
        ORDER_STATE_TRANSITIONS.STORE_LOSE_PACKAGE,
        ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_REFUSE,
        ORDER_STATE_TRANSITIONS.DELIVERY_CANCELLED
      ].includes(this.orderStateTransition)
    );
  }

  get isFinished() {
    return (
      this.isEnded &&
      [
        ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_ORDER_ACCEPTED,
        ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_SENT,
        ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED,
        ORDER_STATE_TRANSITIONS.VALIDATION_BY_ORDER_ACCEPTED,
        ORDER_STATE_TRANSITIONS.VALIDATION_BY_SENT,
        ORDER_STATE_TRANSITIONS.VALIDATION_BY_DELIVERED,
        ORDER_STATE_TRANSITIONS.BUYER_IN_STORE_ACCEPT,
        ORDER_STATE_TRANSITIONS.DELIVERY_BY_SENT,
        ORDER_STATE_TRANSITIONS.DELIVERY_COMPLETED
      ].includes(this.orderStateTransition)
    );
  }

  get isInProgress() {
    return !this.isEnded;
  }

  get hasProblem() {
    return this.problemState !== ORDER_PROBLEM_STATES.NONE;
  }

  get status() {
    return new OrderStatus(this).getValue();
  }

  get isNegotiated() {
    const amount = this.totalAmountBeforeNegotiation;

    return amount > this.totalAmount && amount > this.moneyBox;
  }

  get totalAmountBeforeNegotiation() {
    return this.orderItems?.reduce?.(
      (total, current) => total + current.price,
      this.serviceFeeAmount + this.deliveryPrice
    );
  }

  get isMondialRelay() {
    return this.delivery.tag === DELIVERY_MODES.MONDIAL_RELAY;
  }

  get isHandDelivery() {
    return this.delivery.tag === DELIVERY_MODES.HAND;
  }

  get isLocationDelivery() {
    return this.delivery.tag === DELIVERY_MODES.LOCATION;
  }

  get isCocolis() {
    return this.delivery.tag === DELIVERY_MODES.COCOLIS;
  }

  get isRelaisColis() {
    return this.delivery.tag === DELIVERY_MODES.RELAIS_COLIS;
  }

  get isColissimo() {
    return this.delivery.tag === DELIVERY_MODES.RELAIS_COLISSIMO;
  }

  get isLaposteColissimo() {
    return this.delivery.tag === DELIVERY_MODES.LAPOSTE_COLISSIMO;
  }

  get isLaposteLetter() {
    return this.delivery.tag === DELIVERY_MODES.LAPOSTE_LETTER;
  }
}
