import { BaseModel } from './Base.model';

export class Category extends BaseModel {
  static get relations() {
    return [
      { name: 'root', getUri: entity => entity._root, model: Category },
      { name: 'parent', getUri: entity => entity._parent, model: Category }
    ];
  }
}
