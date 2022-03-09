import { BaseCRUDService } from './BaseCRUD.service';
import { DELIVERY_MODES } from '../enums';

export class OrderService extends BaseCRUDService {
  constructor(...args) {
    super(...args);
    this.endpoint = '/orders';
  }

  _getForwardUrl(id, tag) {
    switch (tag) {
      case DELIVERY_MODES.MONDIAL_RELAY:
      case DELIVERY_MODES.HAND:
      case DELIVERY_MODES.COLISSIMO:
      case DELIVERY_MODES.LAPOSTE_COLISSIMO:
      case DELIVERY_MODES.LAPOSTE_LETTER_FOLLOW:
      case DELIVERY_MODES.LOCATION:
        return `${this.endpoint}/${id}/state`;
      case DELIVERY_MODES.COCOLIS:
      case DELIVERY_MODES.RELAIS_COLIS:
        return `${this.endpoint}/${id}/delivery_states`;
    }
  }

  _getForwardBody(transition, tag) {
    switch (tag) {
      case DELIVERY_MODES.MONDIAL_RELAY:
      case DELIVERY_MODES.HAND:
      case DELIVERY_MODES.COLISSIMO:
      case DELIVERY_MODES.LAPOSTE_COLISSIMO:
      case DELIVERY_MODES.LAPOSTE_LETTER_FOLLOW:
      case DELIVERY_MODES.LOCATION:
        return { orderStateTransition: transition };
      case DELIVERY_MODES.COCOLIS:
      case DELIVERY_MODES.RELAIS_COLIS:
        return { deliveryStateTransition: transition };
    }
  }

  findAllByUserId(userId, options) {
    return this._http.get(`users/${userId}/orders`, options);
  }

  findAllSalesByUserId(userId, options) {
    return this._http.get(`users/${userId}/sales`, options);
  }

  rollback(orderId, { orderState, orderStateTransition }) {
    return this._http.post(`/orders/${orderId}/prev_state/`, {
      data: { orderState, orderStateTransition }
    });
  }

  forward(orderId, { deliveryTag, transition }) {
    return this._http.put(this._getForwardUrl(orderId, deliveryTag), {
      data: this._getForwardBody(transition, deliveryTag)
    });
  }

  cancelDispute(orderId) {
    return this._http.post(`/orders/${orderId}/remove-dispute`, {
      data: null // need to provide data to enable content-type application/json header
    });
  }
}
