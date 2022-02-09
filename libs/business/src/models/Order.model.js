import { BaseModel } from './Base.model';
import { User } from './User.model';
import { OrderItem } from './OrderItem.model';
import { formatPrice } from '@dsp/core';
import {
  ORDER_STATE_TRANSITIONS,
  ORDER_STATES,
  ORDER_PROBLEM_STATES,
  ORDER_DELIVERY_STATE_TRANSITIONS,
  ORDER_DELIVERY_STATES,
  DELIVERY_MODES
} from '../enums';
import { OrderStatus } from './OrderStatus.model';
import { Delivery } from './Delivery.model';
import { Remuneration } from './Remuneration.model';
import { Store } from './Store.model';
import { OrderStateHisto } from './OrderStateHisto.model';
import { DeliveryStateHisto } from './DeliveryStateHisto.model';

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
      },
      {
        name: 'orderStateHistos',
        getUri: entity => entity._orderStateHistos,
        model: OrderStateHisto
      },
      {
        name: 'deliveryStateHistos',
        getUri: entity => entity._deliveryStateHistos,
        model: DeliveryStateHisto
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

  get isOrdered() {
    return this.orderState === ORDER_STATES.ORDERED;
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
        ORDER_STATE_TRANSITIONS.DELIVERY,
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

  get itemsAmount() {
    const amount =
      (this.totalAmount || this.moneyBox) -
      this.deliveryPrice -
      this.serviceFeeAmount;

    return Math.round(amount * 100) / 100;
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

  get trackingNumber() {
    switch (this.delivery?.tag) {
      case DELIVERY_MODES.MONDIAL_RELAY:
        return this.deliveryData?.MondialRelay?.ExpeditionNum;
      case DELIVERY_MODES.RELAIS_COLIS:
      case DELIVERY_MODES.LAPOSTE_COLISSIMO:
        return this.deliveryDetail?.expeditionNum;
      case DELIVERY_MODES.LAPOSTE_LETTER_FOLLOW:
        return this.deliveryDetail?.externalTicketId;
      default:
        return null;
    }
  }

  get trackingUrl() {
    switch (this.delivery?.tag) {
      case DELIVERY_MODES.LAPOSTE_COLISSIMO:
      case DELIVERY_MODES.LAPOSTE_LETTER_FOLLOW:
        return `https://www.laposte.fr/outils/suivre-vos-envois?code=${this.trackingNumber}`;
      default:
        return null;
    }
  }

  get history() {
    return [...this.orderStateHistos, ...this.deliveryStateHistos].sort(
      (a, b) => new Date(b.updated) - new Date(a.updated)
    );
  }

  get nextTransition() {
    if (
      [DELIVERY_MODES.RELAIS_COLIS, DELIVERY_MODES.COCOLIS].includes(
        this.delivery.tag
      )
    ) {
      return nextTransitions[this.delivery.tag][this.deliveryState];
    }
    console.log(nextTransitions, this.delivery.tag);
    return nextTransitions[this.delivery.tag][this.orderState];
  }
}

const nextTransitions = {
  [DELIVERY_MODES.MONDIAL_RELAY]: {
    [ORDER_STATES.ORDER_ACCEPTED]: ORDER_STATE_TRANSITIONS.SEND,
    [ORDER_STATES.SENT]: ORDER_STATE_TRANSITIONS.DISTRIBUTION_BY_SENT,
    [ORDER_STATES.DISTRIBUTED]: ORDER_STATE_TRANSITIONS.DELIVERY,
    [ORDER_STATES.DELIVERED]:
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED
  },
  [DELIVERY_MODES.HAND]: {
    [ORDER_STATES.ORDER_ACCEPTED]: ORDER_STATE_TRANSITIONS.SEND,
    [ORDER_STATES.SENT]: ORDER_STATE_TRANSITIONS.DELIVERY_BY_SENT,
    [ORDER_STATES.DELIVERED]:
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED
  },
  [DELIVERY_MODES.COLISSIMO]: {
    [ORDER_STATES.ORDER_ACCEPTED]: ORDER_STATE_TRANSITIONS.SEND,
    [ORDER_STATES.SENT]: ORDER_STATE_TRANSITIONS.DELIVERY_BY_SENT,
    [ORDER_STATES.DELIVERED]:
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED
  },
  [DELIVERY_MODES.LAPOSTE_COLISSIMO]: {
    [ORDER_STATES.ORDER_ACCEPTED]: ORDER_STATE_TRANSITIONS.SEND,
    [ORDER_STATES.SENT]: ORDER_STATE_TRANSITIONS.DELIVERY_BY_SENT,
    [ORDER_STATES.DELIVERED]:
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED
  },
  [DELIVERY_MODES.LAPOSTE_LETTER]: {
    [ORDER_STATES.ORDER_ACCEPTED]: ORDER_STATE_TRANSITIONS.SEND,
    [ORDER_STATES.SENT]: ORDER_STATE_TRANSITIONS.DELIVERY_BY_SENT,
    [ORDER_STATES.DELIVERED]:
      ORDER_STATE_TRANSITIONS.VALIDATION_AUTOMATIC_BY_DELIVERED
  },
  [DELIVERY_MODES.LOCATION]: {},
  [DELIVERY_MODES.RELAIS_COLIS]: {
    [ORDER_DELIVERY_STATES.START]:
      ORDER_DELIVERY_STATE_TRANSITIONS.EXPEDITION_CREATED_BY_SELLER,
    [ORDER_DELIVERY_STATES.DEPOSIT_IN_RELAY_BY_SELLER_IN_PROGRESS]:
      ORDER_DELIVERY_STATE_TRANSITIONS.DEPOSITED_IN_RELAY_BY_SELLER,
    [ORDER_DELIVERY_STATES.TRANSFER_TO_DESTINATION_RELAY_IN_PROGRESS]:
      ORDER_DELIVERY_STATE_TRANSITIONS.RECEIVED_BY_DESTINATION_RELAY,
    [ORDER_DELIVERY_STATES.RECOVERY_IN_RELAY_BY_BUYER_IN_PROGRESS]:
      ORDER_DELIVERY_STATE_TRANSITIONS.RECOVERED_IN_RELAY_BY_BUYER,
    [ORDER_DELIVERY_STATES.PACKAGE_VALIDATION_BY_BUYER_IN_PROGRESS]:
      ORDER_DELIVERY_STATE_TRANSITIONS.PACKAGE_AUTOMATICALLY_VALIDATED_BY_BUYER
  },
  [DELIVERY_MODES.COCOLIS]: {
    [ORDER_DELIVERY_STATES.CARRIER_SEARCH_IN_PROGRESS]:
      ORDER_DELIVERY_STATE_TRANSITIONS.CARRIER_FOUND,
    [ORDER_DELIVERY_STATES.DELIVERY_IN_PROGRESS]:
      ORDER_DELIVERY_STATE_TRANSITIONS.DELIVERY_COMPLETED,
    [ORDER_DELIVERY_STATES.PACKAGE_VALIDATION_BY_BUYER_IN_PROGRESS]:
      ORDER_DELIVERY_STATE_TRANSITIONS.PACKAGE_AUTOMATICALLY_VALIDATED_BY_BUYER
  }
};
