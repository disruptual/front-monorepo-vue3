import { computed, unref } from 'vue';
import { Store, StoreService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';
import { useMutation } from 'vue-query';

export function useStoreApi() {
  const http = useHttp();
  const storeService = new StoreService({ http });
  const defaultFilters = {
    'sort[createdDate]': 'desc',
    display: 'all'
  };

  return {
    findAllQuery(
      { relations = [], itemsPerPage = 30, filters = {} } = {},
      ...options
    ) {
      const mergedFilters = computed(() => ({
        ...defaultFilters,
        ...unref(filters)
      }));

      const queryKey = computed(
        () => `/locations?${serializeQueryString(mergedFilters.value)}`
      );

      const queryOptions = computed(() => ({
        model: Store,
        itemsPerPage,
        relations,
        ...options
      }));

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return storeService.findAll({
          params: { ...pageParam, ...unref(mergedFilters) }
        });
      };

      return useCollectionQuery(queryKey, queryFn, queryOptions);
    },

    updateMutation() {
      return useMutation('updateStore', ({ id, dto }) => {
        storeService.update(id, dto);
      });
    }
  };
}
