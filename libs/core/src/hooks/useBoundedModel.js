import { useHttp } from './useHttp';
import { computed, ref, unref, watch } from 'vue';
import { useQueries, useQueryClient } from 'vue-query';
import { debounce } from 'lodash-es';
import { createBoundedModel } from '../factories/boundedModel.factory';
import { createQueries } from '../factories/query.factory';
import { deepUnref } from '../utils/helpers';
import { createRelationsNormalizer } from '../factories/relationsNormalizer.factory.js';

const QUERY_BINDING_DEBOUNCE_TIMEOUT = 50;
const QUERY_BINDING_DEBOUNCE_OPTIONS = { leading: true, trailing: true };
const REBIND_REASONS = {
  DATA_HAS_CHANGED: 'queryData',
  KEY_HAS_CHANGED: 'queryKey',
  RELATIONS_ARRAY_HAS_CHANGED: 'relations',
  CHILD_QUERY_HAVE_SETTLED: 'childQueries'
};

export function useBoundedModel(query, options) {
  const queryClient = useQueryClient();
  const relationNormalizer = createRelationsNormalizer();
  const http = useHttp();
  const instance = ref(null);
  let rebindReasons = [];

  const lazyRelations = ref([]);
  const allRelations = computed(() => {
    const relations = deepUnref(options).relations ?? [];

    return [
      ...relationNormalizer.normalize(relations),
      ...unref(lazyRelations)
    ];
  });

  const bindQuery = () => {
    const reuseInstance =
      !rebindReasons.includes(REBIND_REASONS.DATA_HAS_CHANGED) &&
      !rebindReasons.includes(REBIND_REASONS.KEY_HAS_CHANGED);
    rebindReasons = [];

    const { queryKey, model } = deepUnref(options);

    const newValue = createBoundedModel(queryKey, {
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

  const makeRebindScheduler = reason => () => {
    rebindReasons.push(reason);
    debouncedBindQuery();
  };

  const queriesDefinitions = computed(() => {
    return createQueries(instance.value, {
      queryClient: queryClient,
      fetcher: uri => http.get(uri),
      relations: [...new Set(unref(allRelations))],
      onSettled: makeRebindScheduler(REBIND_REASONS.CHILD_QUERY_HAVE_SETTLED)
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
    const relations = deepUnref(options).relations ?? [];

    return query.isLoading.value || relations.some(isRelationLoading);
  });

  watch(
    () => deepUnref(options).queryKey,
    makeRebindScheduler(REBIND_REASONS.KEY_HAS_CHANGED)
  );
  watch(query.data, makeRebindScheduler(REBIND_REASONS.DATA_HAS_CHANGED));
  watch(
    () => unref(allRelations),
    makeRebindScheduler(REBIND_REASONS.RELATIONS_ARRAY_HAS_CHANGED),
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
