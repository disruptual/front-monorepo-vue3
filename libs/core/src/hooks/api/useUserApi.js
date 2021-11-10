import { computed } from 'vue';
import { User, UserService } from '@dsp/business';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCRUDApi } from '../useCRUDApi';

export function useUserApi() {
  return useCRUDApi({ model: User, service: UserService }, userService => ({
    findBySlugQuery(slug, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/slug/${slug}`);

      return useModelQuery(queryKey, () => userService.findBySlug(slug), {
        model: User,
        relations
      });
    }
  }));
}
