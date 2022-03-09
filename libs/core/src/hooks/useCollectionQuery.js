import { createEntityNormalizer } from '../factories/entityNormalizer.factory';
import { useBoundedModel } from './useBoundedModel';
import { computed, unref, watchEffect } from 'vue';
import { useReactiveInfiniteQuery } from './useReactiveQuery';

const extractPageFromUri = uri => {
  const searchParams = new URLSearchParams(uri.slice(uri.indexOf('?')));

  return Number(searchParams.get('page'));
};

const defaultGetNextPageParams = (lastPage, itemsPerPage) => {
  if (!lastPage['hydra:view']?.['hydra:next']) return undefined;

  const nextPageIndex = extractPageFromUri(
    lastPage['hydra:view']['hydra:next']
  );

  return { page: nextPageIndex, itemsPerPage };
};

export function useCollectionQuery(key, fetcher, queryOptions = {}) {
  const {
    model,
    relations,
    itemsPerPage = 30,
    getNextPageParams,
    ...options
  } = unref(queryOptions);

  const mergedOptions = computed(() => {
    const {
      model,
      itemsPerPage = 30,
      getNextPageParams = defaultGetNextPageParams,
      ...options
    } = unref(queryOptions);

    return {
      ...options,
      getNextPageParam: (lastPage, allPages) => {
        return getNextPageParams(lastPage, itemsPerPage, allPages);
      },
      select: createEntityNormalizer(model)
    };
  });

  const query = useReactiveInfiniteQuery(key, fetcher, mergedOptions);

  const boundedQuery = useBoundedModel(query, {
    queryKey: key,
    model,
    relations
  });

  const isLoadingFirstPage = computed(() => {
    const { isLoading, data } = boundedQuery;

    return (
      isLoading.value && (!data.value || data.value?.length <= itemsPerPage)
    );
  });

  return {
    ...boundedQuery,
    key: computed(() => unref(key)),
    isLoadingFirstPage
  };
}
