import { useHttp } from './useHttp';
import { computed, ref, unref, watch, watchEffect } from 'vue';
import { useQueries, useQueryClient } from 'vue-query';
import { debounce, get } from 'lodash-es';
import { createBoundedModel } from '../factories/boundedModel.factory';
import { createQueries } from '../factories/query.factory';

const QUERY_BINDING_DEBOUNCE_TIMEOUT = 50;
const QUERY_BINDING_DEBOUNCE_OPTIONS = { leading: true, trailing: true };
const REBIND_REASONS = {
  DATA_HAS_CHANGED: 'queryData',
  KEY_HAS_CHANGED: 'queryKey',
  RELATIONS_ARRAY_HAS_CHANGED: 'relations',
  CHILD_QUERY_HAVE_SETTLED: 'childQueries'
};

export function useBoundedModel(query, { queryKey, model, relations = [] }) {
  const queryClient = useQueryClient();
  const http = useHttp();
  const instance = ref(null);
  let rebindReasons = [];

  const lazyRelations = ref([]);
  const allRelations = computed(() => [
    ...unref(relations),
    ...unref(lazyRelations)
  ]);

  const bindQuery = () => {
    const reuseInstance =
      !rebindReasons.includes(REBIND_REASONS.DATA_HAS_CHANGED) &&
      !rebindReasons.includes(REBIND_REASONS.KEY_HAS_CHANGED);
    rebindReasons = [];

    const newValue = createBoundedModel(unref(queryKey), {
      modelClass: model,
      queryClient,
      initialValue: reuseInstance ? instance.value : null,
      relations: unref(allRelations),
      onLazyRelationDetected(relation) {
        if (lazyRelations.value.includes(relation)) return;
        lazyRelations.value.push(relation);
      }
    });

    instance.value = newValue;
  };

  const debouncedBindQuery = debounce(
    bindQuery,
    QUERY_BINDING_DEBOUNCE_TIMEOUT,
    QUERY_BINDING_DEBOUNCE_OPTIONS
  );

  const queriesDefinitions = computed(() => {
    return createQueries(instance.value, {
      queryClient: queryClient,
      fetcher: uri => http.get(uri),
      relations: [...new Set(unref(allRelations))],
      onSettled: () => {
        rebindReasons.push(REBIND_REASONS.CHILD_QUERY_HAVE_SETTLED);
        debouncedBindQuery();
      }
    });
  });

  useQueries(queriesDefinitions);

  const isRelationLoading = relationName => {
    return queriesDefinitions.value
      .filter(def => def.relation === relationName)
      .map(def => queryClient.getQueryState(def.queryKey))
      .filter(Boolean)
      .some(query => query.isFetching && !query.data);
  };

  const isRelationsLoading = (...relationNames) =>
    relationNames.some(relation => isRelationLoading(relation));

  const isLoading = computed(() => {
    return (
      query.isLoading.value ||
      relations.some(relation => isRelationLoading(relation))
    );
  });

  watch(
    () => unref(queryKey),
    () => {
      rebindReasons.push(REBIND_REASONS.KEY_HAS_CHANGED);
      debouncedBindQuery();
    }
  );
  watch(query.data, data => {
    rebindReasons.push(REBIND_REASONS.DATA_HAS_CHANGED);
    debouncedBindQuery();
  });
  watch(
    () => unref(allRelations),
    () => {
      rebindReasons.push(REBIND_REASONS.RELATIONS_ARRAY_HAS_CHANGED);
      debouncedBindQuery();
    },
    { deep: true }
  );

  debouncedBindQuery();

  return {
    ...query,
    isLoading,
    isRelationLoading,
    isRelationsLoading,
    data: instance
  };
}
