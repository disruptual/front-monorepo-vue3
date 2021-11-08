import { useHttp } from './useHttp';
import { computed, ref, unref, watch } from 'vue';
import { useQueries, useQueryClient } from 'vue-query';
import { debounce } from 'lodash-es';
import { createBoundedModel } from '../factories/boundedModel.factory';
import { createQueries } from '../factories/query.factory';

const QUERY_BINDING_DEBOUNCE_TIMEOUT = 50;
const QUERY_BINDING_DEBOUNCE_OPTIONS = { leading: true, trailing: true };

export function useBoundedModel(query, { queryKey, model, relations = [] }) {
  const queryClient = useQueryClient();
  const http = useHttp();

  const instance = ref(null);

  const lazyRelations = ref([]);
  const allRelations = computed(() => {
    return [...unref(relations), ...unref(lazyRelations)];
  });

  const bindQuery = () => {
    instance.value = createBoundedModel(unref(queryKey), {
      model,
      queryClient,
      relations: unref(allRelations),
      onLazyRelationDetected(relation) {
        if (lazyRelations.value.includes(relation)) return;
        lazyRelations.value.push(relation);
      }
    });
  };

  const debouncedBindQuery = debounce(
    bindQuery,
    QUERY_BINDING_DEBOUNCE_TIMEOUT,
    QUERY_BINDING_DEBOUNCE_OPTIONS
  );

  const queriesDefinitions = computed(() => {
    return createQueries(instance.value, {
      fetcher: uri => http.get(uri),
      relations: unref(allRelations),
      onSettled: debouncedBindQuery
    });
  });

  const queries = useQueries(queriesDefinitions);
  const isRelationLoading = computed(() =>
    queries.some(query => query.isLoading)
  );

  watch(() => unref(queryKey), debouncedBindQuery);
  watch(query.data, debouncedBindQuery);
  watch(() => unref(allRelations), debouncedBindQuery, { deep: true });
  debouncedBindQuery();

  return { ...query, isRelationLoading, data: instance };
}
