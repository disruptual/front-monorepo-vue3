import { BaseModel } from './Base.model';
import { USER_ROLES } from '@dsp/business/enums';
import { Delivery } from './Delivery.model';
import { Iban } from './Iban.model';
import { Item } from './Item.model';
import { Order } from './Order.model';

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

  get isMuted() {
    return !!this.silentModeActivatedAt;
  }
}
