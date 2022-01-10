import { Location, LocationService } from '@dsp/business';
import { unref, computed } from 'vue';
import { serializeQueryString, useCollectionQuery } from '@dsp/core';
import { useCRUDApi } from '../useCRUDApi';

export function useLocationApi() {
  return useCRUDApi(
    { model: Location, service: LocationService },
    locationService => ({
      findAllQuery(
        { relations = [], itemsPerPage = 30, filters = {} } = {},
        ...options
      ) {
        const queryKey = computed(
          () => `/locations?${serializeQueryString(unref(filters))}`
        );

        const queryOptions = computed(() => ({
          model: Location,
          itemsPerPage,
          relations,
          ...options
        }));

        const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
          return locationService.findAll({
            params: { ...pageParam, ...unref(filters) }
          });
        };

        return useCollectionQuery(queryKey, queryFn, queryOptions);
      }
    })
  );
}
