import { useHttp } from './useHttp';
import { computed, ref, unref, watch, nextTick } from 'vue';
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

  useQueries(queriesDefinitions);

  const isRelationLoading = relationName =>
    queriesDefinitions.value
      .filter(def => def.relation === relationName)
      .map(def => queryClient.getQueryState(def.queryKey))
      .some(query => query.isLoading);

  const isRelationsLoading = (...relationNames) =>
    relationNames.some(relation => isRelationLoading(relation));

  const isLoading = computed(
    () =>
      query.isLoading.value ||
      relations.some(relation => isRelationLoading(relation))
  );

  watch(() => unref(queryKey), debouncedBindQuery);
  watch(query.data, debouncedBindQuery);
  watch(() => unref(allRelations), debouncedBindQuery, { deep: true });
  debouncedBindQuery();

  return {
    ...query,
    isLoading,
    isRelationLoading,
    isRelationsLoading,
    data: instance
  };
}
