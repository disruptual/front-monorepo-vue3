import { computed, unref } from 'vue';
import { Item, ItemService } from '@dsp/business';
import { deepUnref } from '@dsp/core/utils/helpers';

import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';

import { serializeQueryString } from '@dsp/core/utils/helpers';
import { useCRUDApi } from '../useCRUDApi';

export function useItemApi() {
  return useCRUDApi({ model: Item, service: ItemService }, itemService => ({
    searchQuery(options) {
      const queryKey = computed(() => {
        const { filters } = deepUnref(options);

        return `/items/search?${serializeQueryString(filters)}`;
      });

      const queryOptions = computed(() => {
        const { itemsPerPage, relations, ...rest } = deepUnref(options);

        return {
          model: Item,
          itemsPerPage,
          relations,
          ...rest
        };
      });

      const queryFn = computed(() => {
        const { itemsPerPage, filters } = deepUnref(options);

        return ({ pageParam = { page: 1, itemsPerPage } }) =>
          itemService.search({
            params: { ...pageParam, ...filters }
          });
      });

      return useCollectionQuery(queryKey, queryFn, queryOptions);
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
