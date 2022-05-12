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
    const uri = dto['@id'];
    const [id] = uri.split('/').reverse();

    return {
      ...super.fromJSON(dto),
      relatedResourceUri: dto.uri,
      uri,
      id
    };
  }
}
