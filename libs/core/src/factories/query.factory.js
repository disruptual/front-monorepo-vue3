import { uniqBy } from 'lodash-es';
import { Collection } from '@dsp/business';
import { createRelationsNormalizer } from './relationsNormalizer.factory';
import { noop } from '@dsp/core/utils/helpers';

export class QueryBuilder {
  constructor({ fetcher, onSettled, relations, queryClient }) {
    this.fetcher = fetcher;
    this.onSettled = onSettled;
    this.relations = createRelationsNormalizer().normalize(relations);
    this.queryClient = queryClient;
  }

  getRelation(relationName) {
    return this.relations.find(r => r.name === relationName);
  }

  isCollection(element) {
    return Array.isArray(element) || element instanceof Collection;
  }

  build(entityOrCollection) {
    const queries = this.isCollection(entityOrCollection)
      ? entityOrCollection.map(entity => this.createBaseQueries(entity)).flat()
      : this.createBaseQueries(entityOrCollection).flat();

    return uniqBy(queries.flat(), 'queryKey');
  }

  createBaseQueries(entity, prefix = '') {
    return entity.constructor.relations.map(({ getUri, name }) => {
      let uris = getUri(entity);

      if (!Array.isArray(uris)) {
        uris = [uris];
      }

      const ownQueries = uris
        .map(uri => {
          const relation = this.getRelation(`${prefix}${name}`);
          if (!relation) return;
          if (!uri) return;
          // console.log(relation.name, uri, this.queryClient.getQueryData(uri));
          return {
            relation: `${prefix}${name}`,
            queryKey: uri,
            queryFn: () => this.fetcher(uri),
            onSettled: this.onSettled,
            ...(relation?.queryOptions || {})
          };
        })
        .filter(Boolean);

      const subQueries = this.createSubQueries(entity, name, prefix);

      return [...ownQueries, ...subQueries].flat();
    });
  }

  createSubQueries(entity, name, prefix = '') {
    entity.__isLazyDetectionDisabled = true;
    let value = entity[name];
    delete entity.__isLazyDetectionDisabled;

    if (!value) return [];
    return this.isCollection(value)
      ? value
          .map(subEntity =>
            this.createBaseQueries(subEntity, `${prefix}${name}.`)
          )
          .flat()
      : this.createBaseQueries(value, `${prefix}${name}.`).flat();
  }
}

export const createQueries = (
  entityOrCollection,
  { queryClient, fetcher, onSettled, relations = [] }
) => {
  if (!entityOrCollection) return [];

  const queryBuilder = new QueryBuilder({
    fetcher,
    onSettled,
    relations,
    queryClient
  });

  return queryBuilder.build(entityOrCollection);
};
