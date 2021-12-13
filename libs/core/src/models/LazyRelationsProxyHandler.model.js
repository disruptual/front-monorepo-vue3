import { noop } from '@dsp/core/utils/helpers';

export class LazyRelationsProxyHandler {
  constructor({ prefix = '', onLazyRelationDetected = noop }) {
    this.prefix = prefix;
    this.onLazyRelationDetected = onLazyRelationDetected;
    this.promiseResolvers = {};
    this.loadedRelations = [];
  }

  _isUnloadedRelation(target, prop) {
    if (target.__isLazyDetectionDisabled) return false;
    if (!target.constructor) return false;
    if (prop.startsWith?.('_')) return false;
    if (!target.constructor.isRelation?.(prop)) return false;
    if (this.loadedRelations.includes(prop)) return false;

    return true;
  }

  _makeRelationPromise(prop) {
    return new Promise(resolve => {
      if (!this.promiseResolvers[prop]) {
        this.promiseResolvers[prop] = [];
      }
      this.promiseResolvers[prop].push(resolve);
    });
  }

  get(target, prop) {
    if (this._isUnloadedRelation(target, prop)) {
      this.onLazyRelationDetected(`${this.prefix}${prop}`);

      // return () => this._makeRelationPromise(prop);
      return target[prop];
    }

    return target[prop];
  }

  // set(target, prop, value) {
  //   if (
  //     !target.__isLazyDetectionDisabled &&
  //     !target.constructor.isRelation(prop) &&
  //     !this.loadedRelations.includes(prop)
  //   ) {
  //     this.promiseResolvers[prop]?.forEach?.(resolver => resolver(value));
  //     this.promiseResolvers[prop] = [];
  //     this.loadedRelations.push(prop);
  //   }

  //   target[prop] = value;

  //   return true;
  // }
}
