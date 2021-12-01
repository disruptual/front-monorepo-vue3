import { Collection } from '@dsp/business';
import { noop } from '@dsp/core/utils/helpers';
import { createEntityNormalizer } from './entityNormalizer.factory';
import { createRelationsNormalizer } from './relationsNormalizer.factory';
import { createLogger } from '@dsp/core/factories/logger.factory';

class LazyRelationsProxyHandler {
  constructor({ prefix = '', onLazyRelationDetected = noop, queryClient }) {
    this.prefix = prefix;
    this.onLazyRelationDetected = onLazyRelationDetected;
    this.queryClient = queryClient;
  }

  _detectLazyRelation(target, prop) {
    if (target.__isLazyDetectionDisabled) return;
    if (!target.constructor) return;
    if (prop?.startsWith?.('_')) return;
    if (!target.constructor.isRelation?.(prop)) return;

    const relation = target.constructor.getRelation(prop);
    const uri = relation.getUri(target);
    const queryState = this.queryClient.getQueryState(uri);
    if (!queryState && target._warnOnUnloadedRelations) {
      const name = target.constructor.name;
      const logger = createLogger(name);

      logger.warn(
        `Unloaded relation access: ${prop}. You might want to declare it explicitely when passing relations to useModelQuery, or delay accessing it until the lazy relation is loaded`
      );
    }

    this.onLazyRelationDetected(`${this.prefix}${prop}`);
  }

  get(target, prop) {
    this._detectLazyRelation(target, prop);

    return target[prop];
  }
}

class BoundModelFactory {
  constructor(queryClient, relations, onLazyRelationDetected) {
    this.queryClient = queryClient;
    this.relations = createRelationsNormalizer().normalize(relations);
    this.onLazyRelationDetected = onLazyRelationDetected;
  }

  hasRelation(relationName) {
    return this.relations.some(r => r.name === relationName);
  }

  getProxyHandler(prefix) {
    return new LazyRelationsProxyHandler({
      prefix,
      onLazyRelationDetected: this.onLazyRelationDetected,
      queryClient: this.queryClient
    });
  }

  buildRelations(resource, prefix = '') {
    if (resource instanceof Collection) {
      resource.forEach(child => {
        child.constructor.relations.forEach(relation => {
          this.buildRelation(child, prefix, relation);
        });
      });
    } else {
      resource.constructor.relations.forEach(relation => {
        this.buildRelation(resource, prefix, relation);
      });
    }

    return resource;
  }

  buildRelation(entity, prefix, { name, getUri, model }) {
    const isEnabled = this.hasRelation(`${prefix}${name}`);
    if (!isEnabled) return;

    const uri = getUri(entity);

    const options = {
      name,
      uri,
      prefix,
      normalizer: createEntityNormalizer(model, this.getProxyHandler(prefix))
    };

    if (Array.isArray(uri)) {
      this.buildOneToMany(entity, options);
    } else {
      this.buildOneToOne(entity, options);
    }
  }

  buildOneToOne(entity, { name, uri, prefix, normalizer }) {
    const child = this.queryClient.getQueryData(uri);
    if (!child) return;

    entity[name] = this.buildRelations(normalizer(child), `${prefix}${name}.`);
  }

  buildOneToMany(entity, { uri: uris, name, prefix, normalizer }) {
    const children = uris
      .map(uri => this.queryClient.getQueryData(uri))
      .filter(Boolean)
      .map(normalizer);

    entity[name] = children.map(child =>
      this.buildRelations(child, `${prefix}${name}.`)
    );
  }
}

export const createBoundedModel = (
  modelQueryKey,
  { model, queryClient, relations = [], onLazyRelationDetected }
) => {
  const builder = new BoundModelFactory(
    queryClient,
    relations,
    onLazyRelationDetected
  );

  const entity = queryClient.getQueryData(modelQueryKey);
  if (!entity) return null;

  const normalizer = createEntityNormalizer(
    model,
    new LazyRelationsProxyHandler({
      onLazyRelationDetected,
      queryClient
    })
  );
  const normalizedEntity = normalizer(entity);

  const boundModel = Array.isArray(normalizedEntity)
    ? normalizedEntity.map(entity => builder.buildRelations(entity))
    : builder.buildRelations(normalizedEntity);

  return boundModel;
};
