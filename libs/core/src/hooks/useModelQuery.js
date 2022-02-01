import { unref, computed } from 'vue';
import { useReactiveQuery } from './useReactiveQuery';
import { createEntityNormalizer } from '../factories/entityNormalizer.factory';
import { useBoundedModel } from './useBoundedModel';

export function useModelQuery(key, fetcher, queryOptions) {
  const { model, relations } = unref(queryOptions);

  const mergedOptions = computed(() => {
    const { model, relations, ...options } = unref(queryOptions);

    return {
      ...options,
      select: createEntityNormalizer(model)
    };
  });

  const query = useReactiveQuery(unref(key), fetcher, mergedOptions);

  return useBoundedModel(query, { queryKey: key, model, relations });
}
