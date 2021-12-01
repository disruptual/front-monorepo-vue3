import { mapKeys, pickBy } from 'lodash-es';
import frLocale from 'date-fns/locale/fr';
import { format as formatDate } from 'date-fns';
import { DEFAULT_DATE_FORMAT } from '../utils/constants';

export class BaseModel {
  static get relations() {
    return [];
  }

  static isRelation(key) {
    return this.relations.some(r => r.name === key);
  }

  static getRelation(key) {
    return this.relations.find(r => r.name === key);
  }

  constructor(dto) {
    Object.assign(this, this.fromJSON(dto));
  }

  fromJSON(dto) {
    const { '@id': uri, ...rest } = dto;

    const ctor = this.constructor.prototype.constructor;
    const relationKeys = Object.keys(rest).filter(key => ctor.isRelation(key));

    return {
      uri,
      ...Object.fromEntries(relationKeys.map(k => [k, null])),
      ...mapKeys(rest, (value, key) => (ctor.isRelation(key) ? `_${key}` : key))
    };
  }

  toJSON() {
    const ctor = this.constructor.prototype.constructor;

    const { uri, ...ownFields } = pickBy(
      this,
      (_, key) => !ctor.isRelation(key) && !key.startsWith('_')
    );

    const relationsUris = pickBy(this, (_, key) => key.startsWith('_'));

    return {
      '@id': this.uri,
      ...ownFields,
      ...mapKeys(relationsUris, (value, key) => key.substring(1))
    };
  }

  formatCreated(format = DEFAULT_DATE_FORMAT) {
    return formatDate(new Date(this.created), format, {
      locale: frLocale
    });
  }

  detectUnloadedRelations(cb) {
    this._warnOnUnloadedRelations = true;
    const returnValue = cb();

    if (returnValue.then) {
      return returnValue.then(result => {
        this._warnOnUnloadedRelations = false;

        return result;
      });
    }

    this._warnOnUnloadedRelations = false;
    return returnValue;
  }
}
