import { BaseModel } from './Base.model';
import { Category } from './Category.model';
import { Color } from './Color.model';
import { User } from './User.model';
import { Media } from './Media.model';
import { formatPrice } from '@dsp/core';
import { Size } from './Size.model';
import { Brand } from './Brand.model';
import { Condition } from './Condition.model';
import { PackageDelivery } from './PackageDelivery.model';
import { ItemStat } from './ItemStat.model';
import {
  ITEM_PUBLICATION_STATES,
  ITEM_PUBLICATION_STATE_TRANSITIONS
} from '../enums/item.enums';

export class Item extends BaseModel {
  static get relations() {
    return [
      { name: 'category', getUri: entity => entity._category, model: Category },
      {
        name: 'condition',
        getUri: entity => entity._condition,
        model: Condition
      },
      { name: 'colors', getUri: entity => entity._colors, model: Color },
      { name: 'size', getUri: entity => entity._size, model: Size },
      { name: 'user', getUri: entity => entity._user, model: User },
      { name: 'mainMedia', getUri: entity => entity._mainMedia, model: Media },
      { name: 'brand', getUri: entity => entity._brand, model: Brand },
      {
        name: 'packageDelivery',
        getUri: entity => entity._packageDelivery,
        model: PackageDelivery
      },
      {
        name: 'stats',
        getUri: entity => `/item_stats?ids[]=${entity.id}`,
        model: ItemStat
      }
    ];
  }

  get formatedPrice() {
    return formatPrice(this.price);
  }

  get isPublished() {
    return this.publicationState === ITEM_PUBLICATION_STATES.PUBLISHED;
  }

  get isUnpublished() {
    return this.publicationState === ITEM_PUBLICATION_STATES.UNPUBLISHED;
  }

  get isVacancy() {
    return this.publicationState === ITEM_PUBLICATION_STATES.VACANCY;
  }

  get isOrdered() {
    return this.publicationState === ITEM_PUBLICATION_STATES.ORDERED;
  }

  get isPurchased() {
    return this.publicationState === ITEM_PUBLICATION_STATES.PURCHASED;
  }

  get isDeleted() {
    return this.publicationState === ITEM_PUBLICATION_STATES.DELETED;
  }

  get unpublishTransition() {
    if (this.publicationState === ITEM_PUBLICATION_STATES.ORDERED) {
      return ITEM_PUBLICATION_STATE_TRANSITIONS.UNPUBLISHED_ORDERED_ITEM;
    }

    return ITEM_PUBLICATION_STATE_TRANSITIONS.UNPUBLISH;
  }

  get deleteTransition() {
    if (this.publicationState === ITEM_PUBLICATION_STATES.UNPUBLISHED) {
      return ITEM_PUBLICATION_STATE_TRANSITIONS.DELETE_UNPUBLISHED_ITEM;
    }
    if (this.publicationState === ITEM_PUBLICATION_STATES.VACANCY) {
      return ITEM_PUBLICATION_STATE_TRANSITIONS.DELETE_VACANCY_MODE_ITEM;
    }

    return ITEM_PUBLICATION_STATE_TRANSITIONS.DELETE_PUBLISHED_ITEM;
  }

  get canUnpublish() {
    return [
      ITEM_PUBLICATION_STATES.ORDERED,
      ITEM_PUBLICATION_STATES.PUBLISHED
    ].includes(this.publicationState);
  }

  get canDelete() {
    return [
      ITEM_PUBLICATION_STATES.VACANCY,
      ITEM_PUBLICATION_STATES.UNPUBLISHED,
      ITEM_PUBLICATION_STATES.PUBLISHED
    ].includes(this.publicationState);
  }

  get canRepublish() {
    return this.publicationState === ITEM_PUBLICATION_STATES.UNPUBLISHED;
  }
}
