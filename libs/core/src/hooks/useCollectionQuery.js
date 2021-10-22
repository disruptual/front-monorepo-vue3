import { useInfiniteQuery } from 'vue-query';
import { createNormalizer } from '../factories/normalizer.factory';
import { useBoundedModel } from './useBoundedModel';
import { computed, unref } from 'vue';

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

export function useCollectionQuery(
  key,
  fetcher,
  { model, relations, itemsPerPage = 30, getNextPageParams, ...options }
) {
  const query = useInfiniteQuery(unref(key), fetcher, {
    ...options,
    getNextPageParam: (lastPage, allPages) => {
      if (getNextPageParams) {
        return getNextPageParams(lastPage, allPages, itemsPerPage);
      }

      return defaultGetNextPageParams(lastPage, itemsPerPage);
    },
    select: createNormalizer(model)
  });

  const boundedQuery = useBoundedModel(query, {
    queryKey: key,
    model,
    relations
  });

  const isLoadingFirstPage = computed(() => {
    const { isLoading, isRelationLoading, data } = boundedQuery;
    if (isLoading.value) return true;

    return isRelationLoading.value && data.value.length <= itemsPerPage;
  });

  return {
    ...boundedQuery,
    isLoadingFirstPage
  };
}
