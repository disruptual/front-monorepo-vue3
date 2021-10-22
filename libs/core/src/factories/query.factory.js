import { uniqBy } from 'lodash-es';
import { Collection } from '@dsp/business';

export class QueryBuilder {
  constructor({ fetcher, onSettled, relations }) {
    this.fetcher = fetcher;
    this.onSettled = onSettled;
    this.relations = relations;
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

      const ownQueries = uris.map(uri => ({
        queryKey: uri,
        queryFn: () => this.fetcher(uri),
        enabled: this.relations
          .filter(r => r.startsWith(prefix))
          .map(r => r.replace(prefix, ''))
          .includes(name),
        onSettled: this.onSettled
      }));

      const subQueries = this.createSubQueries(entity, name);

      return [...ownQueries, ...subQueries].flat();
    });
  }

  createSubQueries(entity, name) {
    if (!entity[name]) return [];

    return this.isCollection(entity[name])
      ? entity[name]
          .map(subEntity => this.createBaseQueries(subEntity, `${name}.`))
          .flat()
      : this.createBaseQueries(entity[name], `${name}.`).flat();
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
