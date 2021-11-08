import { Collection } from '@dsp/business';
import { noop } from '@dsp/core/utils/helpers';
import { createEntityNormalizer } from './entityNormalizer.factory';
import { createRelationsNormalizer } from './relationsNormalizer.factory';

class LazyRelationsProxyHandler {
  constructor(prefix = '', onLazyRelationDetected = noop) {
    this.prefix = prefix;
    this.onLazyRelationDetected = onLazyRelationDetected;
  }

  _detectLazyRelation(target, prop) {
    if (target.__isLazyDetectionDisabled) return;
    if (!target.constructor) return;
    if (prop?.startsWith?.('__v')) return;
    if (!target.constructor.isRelation?.(prop)) return;

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
      normalizer: createEntityNormalizer(
        model,
        new LazyRelationsProxyHandler(prefix, this.onLazyRelationDetected)
      )
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
    new LazyRelationsProxyHandler('', onLazyRelationDetected)
  );
  const normalizedEntity = normalizer(entity);

  const boundModel = Array.isArray(normalizedEntity)
    ? normalizedEntity.map(entity => builder.buildRelations(entity))
    : builder.buildRelations(normalizedEntity);

  return boundModel;
};
