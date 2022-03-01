import { uniqBy } from 'lodash-es';
import { Collection } from '@dsp/business';
import { createRelationsNormalizer } from './relationsNormalizer.factory';
import { noop } from '@dsp/core/utils/helpers';

export class QueryBuilder {
  constructor({
    fetcher,
    onSettled,
    onRelationLoaded = noop,
    relations,
    queryClient
  }) {
    this.fetcher = fetcher;
    this.onSettled = onSettled;
    this.onRelationLoaded = onRelationLoaded;
    this.relations = createRelationsNormalizer().normalize(relations);
    this.queryClient = queryClient;
  }

  getRelation(relationName) {
    return this.relations.some(r => r.name === relationName);
  }

  isCollection(element) {
    return Array.isArray(element) || element instanceof Collection;
  }

  build(entityOrCollection) {
    const queries = this.isCollection(entityOrCollection)
      ? entityOrCollection.map(entity => this.createBaseQueries(entity)).flat()
      : this.createBaseQueries(entityOrCollection).flat();

    // return uniqBy(queries.flat(), 'queryKey');
    return queries.flat();
  }

  checkRelationIsLoaded({ uris, name, entity }) {
    const isRelationLoaded = uris.every(uri => {
      const query = this.queryClient.getQueryState(uri);

      return query && !query.isFetching;
    });

    if (isRelationLoaded) {
      this.onRelationLoaded(name, entity.uri);
    }
  }

  createBaseQueries(entity, prefix = '') {
    return entity.constructor.relations.map(({ getUri, name }) => {
      let uris = getUri(entity);
      const doCheck = () => {
        this.checkRelationIsLoaded({
          uris,
          entity,
          name
        });
      };
      if (!Array.isArray(uris)) {
        uris = [uris];
      }

      const ownQueries = uris
        .map(uri => {
          const relation = this.getRelation(`${prefix}${name}`);
          if (!relation) return;
          if (!uri) return;
          doCheck();
          return {
            relation: `${prefix}${name}`,
            queryKey: uri,
            queryFn: () => this.fetcher(uri),
            onSettled: (...args) => {
              doCheck();
              return this.onSettled(...args);
            },
            ...(relation?.queryOptions || {})
          };
        })
        .filter(Boolean);

      const subQueries = this.createSubQueries(entity, name);

      return [...ownQueries, ...subQueries].flat();
    });
  }

  createSubQueries(entity, name) {
    entity.__isLazyDetectionDisabled = true;
    let value = entity[name];
    delete entity.__isLazyDetectionDisabled;

    if (!value) return [];

    return this.isCollection(value)
      ? value
          .map(subEntity => this.createBaseQueries(subEntity, `${name}.`))
          .flat()
      : this.createBaseQueries(value, `${name}.`).flat();
  }
}

export const createQueries = (
  entityOrCollection,
  { queryClient, fetcher, onSettled, onRelationLoaded, relations = [] }
) => {
  if (!entityOrCollection) return [];

  const queryBuilder = new QueryBuilder({
    fetcher,
    onSettled,
    onRelationLoaded,
    relations,
    queryClient
  });

  return queryBuilder.build(entityOrCollection);
};
