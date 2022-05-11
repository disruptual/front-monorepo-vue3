import { BaseModel } from './Base.model';
import { mapKeys } from 'lodash-es';
import { formatDistanceToNow } from 'date-fns';
import frLocale from 'date-fns/locale/fr';

export class Notification extends BaseModel {
  get formatedCreatedAt() {
    return formatDistanceToNow(new Date(this.createdAt), {
      addSuffix: true,
      includeSeconds: false,
      locale: frLocale
    });
  }

  fromJSON(dto) {
    const { '@id': uri, '@id': id, ...rest } = dto;

    const [notificationId] = id.split('/').reverse();

    const ctor = this.constructor.prototype.constructor;
    const relationKeys = Object.keys(rest).filter(key => ctor.isRelation(key));

    return {
      uri,
      id: parseInt(notificationId),
      ...Object.fromEntries(
        relationKeys.map(k => {
          return [k, null];
        })
      ),
      ...mapKeys(rest, (value, key) => (ctor.isRelation(key) ? `_${key}` : key))
    };
  }
}
