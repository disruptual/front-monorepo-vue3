import { unref, computed } from 'vue';
import { useReactiveQuery } from './useReactiveQuery';
import { createEntityNormalizer } from '../factories/entityNormalizer.factory';
import { useBoundedModel } from './useBoundedModel';
import { deepUnref } from '../utils/helpers';

export function useModelQuery(key, fetcher, queryOptions) {
  const { model, relations } = unref(queryOptions);

  const mergedOptions = computed(() => {
    const { model, relations, ...options } = deepUnref(queryOptions);

    return {
      ...options,
      select: createEntityNormalizer(model)
    };
  });

  const query = useReactiveQuery(key, fetcher, mergedOptions);

  const boundedQueryOptions = computed(() => {
    const { model, relations } = unref(queryOptions);
    return { queryKey: key, model, relations };
  });
  return useBoundedModel(query, boundedQueryOptions);
}
