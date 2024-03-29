import { formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { BaseModel } from './Base.model';
import { USER_ROLES } from '@dsp/business/enums';
import { Delivery } from './Delivery.model';
import { Iban } from './Iban.model';
import { Item } from './Item.model';
import { Order } from './Order.model';
import { Review } from './Review.model';
import { Address } from './Address.model';
import { Location } from './Location.model';
import { Cart } from './Cart.model';
import { SuperCart } from './SuperCart.model';

export class User extends BaseModel {
  static get relations() {
    return [
      {
        name: 'deliveries',
        getUri: entity => entity._deliveries,
        model: Delivery
      },
      {
        name: 'ibans',
        getUri: entity => `${entity.uri}/ibans`,
        model: Iban
      },
      {
        name: 'items',
        getUri: entity => `${entity.uri}/items`,
        model: Item
      },
      {
        name: 'orders',
        getUri: entity => `${entity.uri}/orders`,
        model: Order
      },
      {
        name: 'sales',
        getUri: entity => `${entity.uri}/sales`,
        model: Order
      },
      {
        name: 'carts',
        getUri: entity => `${entity.uri}/carts`,
        model: Cart
      },
      {
        name: 'reviewsReceived',
        getUri: entity => `${entity.uri}/reviews_tos`,
        model: Review
      },
      {
        name: 'reviewsGiven',
        getUri: entity => `${entity.uri}/reviews_froms`,
        model: Review
      },
      {
        name: 'superCart',
        getUri: entity => `${entity.uri}/super_cart`,
        model: SuperCart
      },
      {
        name: 'mainAddress',
        getUri: entity => entity._mainAddress,
        model: Address
      },
      {
        name: 'storeLocation',
        getUri: entity => entity.responsableLocations?.[0],
        model: Location
      }
    ];
  }

  hasIbans() {
    return this.ibans?.length > 0;
  }

  hasRole(role) {
    return this.roles.includes(role);
  }

  hasRoles(...roles) {
    if (roles.length === 0) return true;
    return roles.some(role => this.hasRole(role));
  }

  hasAllRoles(...roles) {
    return roles.every(role => this.hasRole(role));
  }

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  get isUser() {
    return this.hasRole(USER_ROLES.USER);
  }

  get isAdmin() {
    return this.hasRole(USER_ROLES.ADMIN);
  }

  get isProjectManager() {
    return this.hasRole(USER_ROLES.PROJECT_MANAGER);
  }

  get isStore() {
    return this.hasRole(USER_ROLES.STORE);
  }

  get isDAF() {
    return this.hasRole(USER_ROLES.DAF);
  }

  get isMuted() {
    return !!this.silentModeActivatedAt;
  }

  get formatedLastConnectionAt() {
    return formatDistanceToNow(new Date(this.lastConnectionAt), {
      addSuffix: true,
      includeSeconds: false,
      locale: frLocale
    });
  }

  get formatedLastItemUpdatedAt() {
    return formatDistanceToNow(new Date(this.lastItemUpdatedAt), {
      addSuffix: true,
      includeSeconds: false,
      locale: frLocale
    });
  }

  hasDelivery(delivery) {
    return this._deliveries.includes(delivery.uri);
  }
}
