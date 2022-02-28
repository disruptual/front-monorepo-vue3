import { CmsPage, CmsPageService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';
import { computed } from 'vue';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';

export function useCmsPageApi() {
  return useCRUDApi(
    { model: CmsPage, service: CmsPageService },
    cmsPageService => ({
      findBySlugQuery(slug, { relations = [] } = {}) {
        const queryKey = computed(() => `/cms/slug/${slug}`);

        return useModelQuery(queryKey, () => cmsPageService.findBySlug(slug), {
          model: CmsPage,
          relations,
          staleTime: Infinity
        });
      }
    })
  );
}
