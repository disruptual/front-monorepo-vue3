export interface IEmitter {
  on(eventName: string, payload: any): IEmitter;
  off(eventName: string, payload: any): IEmitter;
}
