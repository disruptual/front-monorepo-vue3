import mitt, { Emitter, EventType } from 'mitt';

export class EventEmitter<T extends Record<EventType, any>> {
  protected emitter: Emitter<T>;

  constructor() {
    this.emitter = mitt<T>();
  }

  on(...args: [keyof T, any?]) {
    this.emitter.on(...args);

    return this;
  }

  off(...args: [keyof T, any?]) {
    this.emitter.off(...args);

    return this;
  }

  emit(...args: [keyof T, any?]) {
    this.emitter.emit(...args);

    return this;
  }
}
