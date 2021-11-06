import { uniqBy } from 'lodash-es';
import { Collection } from '@dsp/business';
import { createRelationsNormalizer } from './relationsNormalizer.factory';

export class QueryBuilder {
  constructor({ fetcher, onSettled, relations }) {
    this.fetcher = fetcher;
    this.onSettled = onSettled;
    this.relations = createRelationsNormalizer().normalize(relations);
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

    return uniqBy(queries.flat(), 'queryKey');
  }

  createBaseQueries(entity, prefix = '') {
    return entity.constructor.relations.map(({ getUri, name }) => {
      let uris = getUri(entity);

      if (!Array.isArray(uris)) {
        uris = [uris];
      }

      const ownQueries = uris.map(uri => {
        const relation = this.getRelation(`${prefix}${name}`);
        return {
          queryKey: uri,
          queryFn: () => this.fetcher(uri),
          enabled: !!relation,
          onSettled: this.onSettled,
          ...(relation?.queryOptions || {})
        };
      });

      const subQueries = this.createSubQueries(entity, name);

      return [...ownQueries, ...subQueries].flat();
    });
  }

  createSubQueries(entity, name) {
    let value = entity[name];

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
  { fetcher, onSettled, relations = [] }
) => {
  if (!entityOrCollection) return [];

  const queryBuilder = new QueryBuilder({ fetcher, onSettled, relations });

  return queryBuilder.build(entityOrCollection);
};
