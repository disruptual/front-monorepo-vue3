import { Carousel, CarouselService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useCarouselApi() {
  return useCRUDApi({ model: Carousel, service: CarouselService });
}
