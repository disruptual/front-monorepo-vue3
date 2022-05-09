import { BaseModel } from './Base.model';
export class RecommendedBrand extends BaseModel {
  constructor(...args) {
    super(...args);
    this.formatModel();
  }

  formatModel() {
    if (this.brand) {
      let id = this.id;
      Object.assign(this, this.brand);
      this.id = id;
      this.brandId = this.brand.id;
    }
  }
}
