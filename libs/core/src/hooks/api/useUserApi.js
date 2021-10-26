import { computed, watchEffect, unref } from 'vue';
import { useMutation } from 'vue-query';
import { User, UserService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';

export function useUserApi() {
  const http = useHttp();
  const userService = new UserService({ http });

  return {
    findAllQuery(
      { relations = [], itemsPerPage = 30, filters = {} } = {},
      ...options
    ) {
      const queryKey = computed(
        () => `/users?${serializeQueryString(unref(filters))}`
      );

      const queryOptions = computed(() => ({
        model: User,
        itemsPerPage,
        relations,
        ...options
      }));

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return userService.findAll({
          params: { ...pageParam, ...unref(filters) }
        });
      };

      return useCollectionQuery(queryKey, queryFn, queryOptions);
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
