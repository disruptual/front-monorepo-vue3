import { RecommendedBrand, RecommendedBrandService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useRecommendedBrandApi() {
  return useCRUDApi({
    model: RecommendedBrand,
    service: RecommendedBrandService
  });
}
