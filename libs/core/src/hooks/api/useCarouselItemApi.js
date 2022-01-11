import { CarouselItem, CarouselItemService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useCarouselItemApi() {
  return useCRUDApi({
    model: CarouselItem,
    service: CarouselItemService
  });
}
