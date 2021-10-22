import { unref } from 'vue';
import { useQuery } from 'vue-query';
import { createNormalizer } from '../factories/normalizer.factory';
import { useBoundedModel } from './useBoundedModel';

export function useModelQuery(key, fetcher, { model, relations, ...options }) {
  const query = useQuery(unref(key), fetcher, {
    ...options,
    select: createNormalizer(model)
  });

  return useBoundedModel(query, { queryKey: key, model, relations });
}
