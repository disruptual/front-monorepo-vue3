import { BaseModel } from './Base.model';
import { CarouselItem } from './CarouselItem.model';

export class Carousel extends BaseModel {
  constructor(...args) {
    super(...args);
    this.carouselItems = this.carouselItems.map(c => new CarouselItem(c));
  }
}
