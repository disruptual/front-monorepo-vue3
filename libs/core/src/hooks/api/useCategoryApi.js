import { Category, CategoryService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useCategoryApi() {
  return useCRUDApi({
    model: Category,
    service: CategoryService,
    defaultQueryOptions: { staleTime: Infinity }
  });
}
