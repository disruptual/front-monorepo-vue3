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
      findBySlugQuery(slug, options) {
        const queryKey = computed(() => `/categories/slug/${unref(slug)}`);
        const queryOptions = computed(() => ({
          ...unref(options),
          model: Category
        }));

        return useModelQuery(
          queryKey,
          () => categoryService.findBySlug(unref(slug)),
          queryOptions
        );
      }
    })
  );
}
