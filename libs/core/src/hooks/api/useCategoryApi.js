import { computed, unref } from 'vue';
import { Category, CategoryService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';

export function useCategoryApi() {
  return useCRUDApi(
    {
      model: Category,
      service: CategoryService,
      defaultQueryOptions: { staleTime: Infinity }
    },
    categoryService => ({
      findBySlugQuery(slug, { relations = [] } = {}) {
        const queryKey = computed(() => `/categories/slug/${unref(slug)}`);

        return useModelQuery(queryKey, () => categoryService.findBySlug(slug), {
          model: Category,
          relations
        });
      }
    })
  );
}
