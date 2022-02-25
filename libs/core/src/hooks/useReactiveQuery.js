import { useQuery, useInfiniteQuery } from 'vue-query';
import { reactive, unref, watchEffect, isRef } from 'vue';
import { isObject } from '../utils/assertions';

const deepUnref = maybeRef => {
  const result = unref(maybeRef);
  if (!isObject(result)) return result;

  return Object.fromEntries(
    Object.entries(result).map(([key, value]) => [key, deepUnref(value)])
  );
};
export const useReactiveQuery = (queryKey, queryFn, queryOptions) => {
  const state = reactive({
    queryKey: unref(queryKey),
    queryFn: unref(queryFn),
    ...unref(queryOptions)
  });

  watchEffect(() => {
    state.queryKey = unref(queryKey);
    state.queryFn = unref(queryFn);
    Object.assign(state, unref(queryOptions));
  });

  return useQuery(state);
};

export const useReactiveInfiniteQuery = (queryKey, queryFn, queryOptions) => {
  const state = reactive({
    queryKey: unref(queryKey),
    queryFn: unref(queryFn),
    options: unref(queryOptions)
  });

  watchEffect(() => {
    state.queryKey = unref(queryKey);
    state.queryFn = unref(queryFn);
    Object.assign(state, deepUnref(queryOptions));
  });

  return useInfiniteQuery(state);
};
