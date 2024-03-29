import { computed, unref } from 'vue';
import { Item, ItemService } from '@dsp/business';
import { merge } from 'lodash-es';
import { deepUnref } from '@dsp/core/utils/helpers';

import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';

import { serializeQueryString } from '@dsp/core/utils/helpers';
import { useCRUDApi } from '../useCRUDApi';
import { useModelQuery } from '../useModelQuery';

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

    findBySlugQuery(slug, { relations = [] } = {}) {
      const queryKey = computed(() => `/items/slug/${slug}`);

      return useModelQuery(queryKey, () => itemService.findBySlugQuery(slug), {
        model: Item,
        relations
      });
    },

    findAllByUserIdQuery(userId, options = {}) {
      const queryKey = computed(() => `/users/${unref(userId)}/items`);

      const queryOptions = computed(() => {
        const { relations = [], ...rest } = unref(options);

        return {
          model: Item,
          relations,
          ...rest
        };
      });

      return useCollectionQuery(
        queryKey,
        ({ pageParam }) => {
          const { requestOptions } = unref(options);
          return itemService.findAllByUserId(
            unref(userId),
            merge(requestOptions, {
              params: {
                page: pageParam?.page ?? 1
              }
            })
          );
        },
        queryOptions
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
