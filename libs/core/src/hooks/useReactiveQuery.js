import { useQuery, useInfiniteQuery } from 'vue-query';
import { reactive, unref, watchEffect } from 'vue';
import { deepUnref } from '../utils/helpers';

export const useReactiveQuery = (queryKey, queryFn, queryOptions) => {
  const state = reactive({
    queryKey: unref(queryKey),
    queryFn: unref(queryFn),
    ...deepUnref(queryOptions)
  });

  watchEffect(() => {
    state.queryKey = unref(queryKey);
    state.queryFn = unref(queryFn);
    Object.assign(state, deepUnref(queryOptions));
  });

  return useQuery(state);
};

export const useReactiveInfiniteQuery = (queryKey, queryFn, queryOptions) => {
  const state = reactive({
    queryKey: unref(queryKey),
    queryFn: unref(queryFn),
    ...deepUnref(queryOptions)
  });

  watchEffect(() => {
    state.queryKey = unref(queryKey);
    state.queryFn = unref(queryFn);
    Object.assign(state, deepUnref(queryOptions));
  });

  return useInfiniteQuery(state);
};
