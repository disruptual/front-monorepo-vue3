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
import { DeliveryDetail } from './DeliveryDetail.model';
import { OrderStateHisto } from './OrderStateHisto.model';
import { DeliveryStateHisto } from './DeliveryStateHisto.model';
import { OrderProblem } from './OrderProblem.model';
import { OrderAddress } from './OrderAddress.model';

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
        name: 'sellerOrderAddress',
        getUri: entity => entity._sellerOrderAddress,
        model: OrderAddress
      },
      {
        name: 'buyerOrderAddress',
        getUri: entity => entity._buyerOrderAddress,
        model: OrderAddress
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
        name: 'deliveryDetail',
        getUri: entity => entity._deliveryDetail?.['@id'],
        model: DeliveryDetail
      },
      {
        name: 'warehouseLocation',
        getUri: entity => entity._warehouseLocation,
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
      },
      {
        name: 'orderProblems',
        getUri: entity => entity._orderProblems,
        model: OrderProblem
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

  get isDisputed() {
    return this.problemState === ORDER_PROBLEM_STATES.DISPUTED;
  }

  get status() {
    return new OrderStatus(this).getValue();
  }

  get isNegotiated() {
    return this.itemsAmountBeforeNegotiation !== this.itemsAmount;
  }

  get itemsAmountBeforeNegotiation() {
    return this.orderItems?.reduce?.(
      (total, current) => total + current.price,
      0
    );
  }

  get totalAmountBeforeNegotiation() {
    return (
      this.itemsAmountBeforeNegotiation +
      this.serviceFeeAmount +
      this.deliveryPrice
    );
  }

  get itemsAmount() {
    return Math.round(this.totalPrice * 100) / 100;
  }

  get creditedTotal() {
    if (!this.remuneration) return null;
    if (this.remuneration.isGiftCard) {
      return this.itemsAmount + this.abundedPriceSeller;
    }

    return this.itemsAmount;
  }

  get paidTotal() {
    return this.moneyBox + this.totalAmount;
  }

  get isMondialRelay() {
    return this.delivery.tag === DELIVERY_MODES.MONDIAL_RELAY;
  }

  get isHandDelivery() {
    return this.delivery?.tag === DELIVERY_MODES.HAND;
  }

  get isLocationDelivery() {
    return this.delivery?.tag === DELIVERY_MODES.LOCATION;
  }

  get isCocolis() {
    return this.delivery?.tag === DELIVERY_MODES.COCOLIS;
  }

  get isRelaisColis() {
    return this.delivery?.tag === DELIVERY_MODES.RELAIS_COLIS;
  }

  get isColissimo() {
    return this.delivery?.tag === DELIVERY_MODES.RELAIS_COLISSIMO;
  }

  get isLaposteColissimo() {
    return this.delivery?.tag === DELIVERY_MODES.LAPOSTE_COLISSIMO;
  }

  get isLaposteLetter() {
    return this.delivery?.tag === DELIVERY_MODES.LAPOSTE_LETTER;
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

  get Etiquette() {
    switch (this.delivery?.tag) {
      case DELIVERY_MODES.MONDIAL_RELAY:
        return this.deliveryData?.MondialRelay?.URL_Etiquette;
      case DELIVERY_MODES.RELAIS_COLIS:
        return this.deliveryDetail?.buyerDeliveryFormUrl;
      case DELIVERY_MODES.LAPOSTE_COLISSIMO:
      case DELIVERY_MODES.LAPOSTE_LETTER_FOLLOW:
        return this.deliveryDetail?.base64EncodedTicket;
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

  get isRecoverableBySeller() {
    if (!this.orderItems) return false;
    if (this.isRecoveryDateExpired) return false;

    return this.orderItems.some(
      o =>
        // @TODO: create enums for conformityStates et recoveryStates
        o.conformityState === 'REFUSED_BY_BUYER' &&
        o.recoveryState === 'AWAITING_RECOVERY'
    );
  }

  get isRecoveryDateExpired() {
    const now = new Date();
    const limit = new Date(
      this.order.dateForTheSellerToCollectTheirItemsInStore
    );

    return now > limit;
  }

  get orderStatehistory() {
    return [...this.orderStateHistos].sort(
      (a, b) =>
        new Date(b.updated ?? b.updatedAt) - new Date(a.updated ?? a.updatedAt)
    );
  }

  get orderDeliveryStateHistory() {
    return [...this.deliveryStateHistos].sort(
      (a, b) =>
        new Date(b.updated ?? b.updatedAt) - new Date(a.updated ?? a.updatedAt)
    );
  }

  get history() {
    const index = this.orderStatehistory.findIndex(
      o => o.orderState === 'DELIVERY_IN_PROGRESS' && o.problemState === 'NONE'
    );

    const change = this.orderStatehistory.some(
      o => o.orderState === 'DELIVERY_IN_PROGRESS' && o.problemState === 'NONE'
    );

    const result = this.orderStatehistory.slice();
    result.splice(index, 1, ...this.orderDeliveryStateHistory);
    if (change) return result;
    else return this.orderStatehistory;
  }

  get nextTransition() {
    return nextTransitions[this.delivery.tag][this.deliveryState];
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
