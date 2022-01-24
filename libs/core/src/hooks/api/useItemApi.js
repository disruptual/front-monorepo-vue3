import { computed, reactive } from 'vue';
import { Item, ItemService } from '@dsp/business';

import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';

import { SORT_ORDERS } from '@dsp/core/utils/constants';
import { serializeQueryString } from '@dsp/core/utils/helpers';
import { useCRUDApi } from '../useCRUDApi';

export function useItemApi() {
  return useCRUDApi({ model: Item, service: ItemService }, itemService => ({
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
        return itemService.search({ params: { ...pageParam, ...filters } });
      };

      return useCollectionQuery(queryKey, queryFn, options);
    },

    findAllByUserIdQuery(userId, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/${userId}/items`);

      return useCollectionQuery(
        queryKey,
        () => itemService.findAllByUserId(userId),
        { model: Item, relations }
      );
    },

    findAllByEventPhysicalDepositedIdQuery(eventId, { relations = [] } = {}) {
      const queryKey = computed(
        () => `${eventId}/items?exists[eventPhysicalDepositedAt]=true`
      );

      const queryFn = ({ pageParam = { page: 1 } }) => {
        return itemService.findAllByEventPhysicalDepositedId(eventId, {
          params: { ...pageParam }
        });
      };

      return useCollectionQuery(queryKey, queryFn, { model: Item, relations });
    },

    findAllByEventDigitalDepositedIdQuery(eventId, { relations = [] } = {}) {
      const queryKey = computed(() => `${eventId}/items`);

      const queryFn = ({ pageParam = { page: 1 } }) => {
        return itemService.findAllByEventDigitalDepositedId(eventId, {
          params: { ...pageParam }
        });
      };

      return useCollectionQuery(queryKey, queryFn, { model: Item, relations });
    }
  }));
}
