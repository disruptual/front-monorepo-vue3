import { RecommendedCategory, RecommendedCategoryService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useRecommendedCategoryApi() {
  return useCRUDApi({
    model: RecommendedCategory,
    service: RecommendedCategoryService
  });
}
