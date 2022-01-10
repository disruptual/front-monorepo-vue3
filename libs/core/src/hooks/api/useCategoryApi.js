import { Category, CategoryService } from '@dsp/business';
import { unref, computed } from 'vue';
import { serializeQueryString, useCollectionQuery } from '@dsp/core';
import { useCRUDApi } from '../useCRUDApi';

export function useCategoryApi() {
  return useCRUDApi(
    { model: Category, service: CategoryService },
    categoryService => ({
      findAllQuery(
        { relations = [], itemsPerPage = 30, filters = {} } = {},
        ...options
      ) {
        const queryKey = computed(
          () => `/categories?${serializeQueryString(unref(filters))}`
        );

        const queryOptions = computed(() => ({
          model: Category,
          itemsPerPage,
          relations,
          ...options
        }));

        const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
          return categoryService.findAll({
            params: { ...pageParam, ...unref(filters) }
          });
        };

        return useCollectionQuery(queryKey, queryFn, queryOptions);
      }
    })
  );
}
