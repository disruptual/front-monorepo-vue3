import { BaseModel } from './Base.model';

export class Color extends BaseModel {
  get hexCode() {
    return `#${this.hex}`;
  }
}
