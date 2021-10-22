import { computed, unref } from 'vue';
import { useMutation } from 'vue-query';
import { User, UserService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';

export function useUserApi() {
  const http = useHttp();
  const userService = new UserService({ http });

  return {
    findAllQuery({ relations = [], itemsPerPage = 30 } = {}) {
      const queryKey = computed(() => `/users`);

      const options = {
        model: User,
        itemsPerPage,
        relations
      };

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) =>
        userService.findAll({ params: { ...pageParam } });

      return useCollectionQuery(queryKey, queryFn, options);
    },

    findBySlugQuery(slug, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/slug/${slug}`);

      return useModelQuery(queryKey, () => userService.findBySlug(slug), {
        model: User,
        relations
      });
    },

    updateMutation(id) {
      return useMutation('updateUser', dto =>
        userService.update(unref(id, dto))
      );
    }
  };
}
