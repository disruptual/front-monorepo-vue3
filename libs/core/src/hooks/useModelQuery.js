import { unref } from 'vue';
import { useQuery } from 'vue-query';
import { createEntityNormalizer } from '../factories/entityNormalizer.factory';
import { useBoundedModel } from './useBoundedModel';

export function useModelQuery(key, fetcher, { model, relations, ...options }) {
  const query = useQuery(unref(key), fetcher, {
    ...options,
    select: createEntityNormalizer(model)
  });

  return useBoundedModel(query, { queryKey: key, model, relations });
}
