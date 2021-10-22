import { useQuery } from 'vue-query';
import { reactive, unref, ref, watchEffect } from 'vue';

export const useReactiveQuery = (queryKey, queryFn, queryOptions) => {
  const state = reactive({
    queryKey: unref(queryKey),
    queryFn: unref(queryFn),
    ...unref(queryOptions)
  });

  watchEffect(() => {
    state.queryKey = unref(queryKey);
    state.queryFn = unref(queryFn);
    Object.assign(state, queryOptions);
  });

  return useQuery(state);
};
