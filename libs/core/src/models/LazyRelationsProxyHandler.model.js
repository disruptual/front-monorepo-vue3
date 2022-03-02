import { noop } from '@dsp/core/utils/helpers';
import { nanoid } from 'nanoid';

export class LazyRelationsProxyHandler {
  constructor({ prefix = '', onLazyRelationDetected = noop }) {
    this.id = nanoid();
    this.prefix = prefix;
    this.onLazyRelationDetected = onLazyRelationDetected;
    this.detectedRelations = [];
  }

  _isUnloadedRelation(target, prop) {
    if (target.__isLazyDetectionDisabled) return false;
    if (!target.constructor) return false;
    if (prop.startsWith?.('_')) return false;
    if (!target.constructor.isRelation?.(prop)) return false;
    if (this.detectedRelations.includes(prop)) return false;

    return true;
  }

  get(target, prop) {
    if (this._isUnloadedRelation(target, prop)) {
      this.detectedRelations.push(prop);
      this.onLazyRelationDetected(`${this.prefix}${prop}`);

      return target[prop];
    }

    return target[prop];
  }
}
