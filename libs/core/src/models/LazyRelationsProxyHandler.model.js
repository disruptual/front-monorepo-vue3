import { noop } from '@dsp/core/utils/helpers';

export class LazyRelationsProxyHandler {
  constructor({ prefix = '', onLazyRelationDetected = noop }) {
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

      return target[`_${prop}Lazy`];
    }

    return target[prop];
  }
}
