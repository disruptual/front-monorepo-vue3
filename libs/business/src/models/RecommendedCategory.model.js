import { BaseModel } from './Base.model';

export class RecommendedCategory extends BaseModel {
  constructor(...args) {
    super(...args);
    this.formatModel();
  }

  formatModel() {
    if (this.category) {
      let id = this.id;
      Object.assign(this, this.category);
      this.id = id;
      this.categoryId = this.category.id;
    }
  }
}
