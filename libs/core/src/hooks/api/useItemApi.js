import { computed, reactive } from 'vue';
import { Item, ItemService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { SORT_ORDERS } from '@dsp/core/utils/constants';
import { serializeQueryString } from '@dsp/core/utils/helpers';

export function useItemApi() {
  const http = useHttp();
  const itemService = new ItemService({ http });

  return {
    searchQuery({ relations = [], itemsPerPage = 30 } = {}) {
      const filters = reactive({
        'sort[created]': SORT_ORDERS.DESC
      });

      const queryKey = computed(
        () => `/items/search?${serializeQueryString(filters)}`
      );

      const options = {
        model: Item,
        itemsPerPage,
        relations
      };

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return itemService.findAll({ params: { ...pageParam, ...filters } });
      };

      return useCollectionQuery(queryKey, queryFn, options);
    },

    findAllQuery({ relations = [], itemsPerPage = 30 } = {}) {
      const queryKey = computed(() => `/users`);

      const options = {
        model: Item,
        itemsPerPage,
        relations
      };

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) =>
        itemService.findAll({ params: { ...pageParam } });

      return useCollectionQuery(queryKey, queryFn, options);
    },

    findByIdQuery(id, { relations = [] } = {}) {
      const queryKey = computed(() => `/items/${id}`);

      const options = {
        model: Item,
        relations
      };

      return useModelQuery(queryKey, () => itemService.findById(id), options);
    },

    findAllByUserIdQuery(userId, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/${userId}/items`);

      return useCollectionQuery(
        queryKey,
        () => itemService.findAllByUserId(userId),
        { model: Item, relations }
      );
    }
  };
}
