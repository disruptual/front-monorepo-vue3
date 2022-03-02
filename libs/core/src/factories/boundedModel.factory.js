import { Collection } from '@dsp/business';
import { createEntityNormalizer } from './entityNormalizer.factory';
import { createRelationsNormalizer } from './relationsNormalizer.factory';
import { LazyRelationsProxyHandler } from '@dsp/core/models/LazyRelationsProxyHandler.model';
import { noop } from '@dsp/core/utils/helpers';

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
    const handler = new LazyRelationsProxyHandler({
      prefix,
      onLazyRelationDetected: this.onLazyRelationDetected
    });
    return handler;
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
    const handler = this.getProxyHandler(`${prefix}${name}.`);

    const options = {
      name,
      uri,
      prefix,
      model,
      normalizer: createEntityNormalizer(model, handler)
    };

    if (Array.isArray(uri)) {
      this.buildOneToMany(entity, options);
    } else {
      this.buildOneToOne(entity, options);
    }
  }

  buildOneToOne(entity, { name, uri, prefix, normalizer, model }) {
    if (!uri) return;
    const child = this.queryClient.getQueryData(uri);
    if (!child) return;

    entity.__isLazyDetectionDisabled = true;
    const normalized =
      entity[name] instanceof model ? entity[name] : normalizer(child);
    delete entity.__isLazyDetectionDisabled;

    entity[name] = this.buildRelations(normalized, `${prefix}${name}.`);
  }

  buildOneToMany(entity, { uri: uris, name, prefix, normalizer, model }) {
    const children = uris
      .filter(Boolean)
      .map(uri => this.queryClient.getQueryData(uri))
      .filter(Boolean)
      .map(normalizer);

    entity[name] = children.map((child, i) => {
      entity.__isLazyDetectionDisabled = true;
      const normalizedChild =
        child instanceof model ? child : normalizer(child);
      delete entity.__isLazyDetectionDisabled;

      return this.buildRelations(normalizedChild, `${prefix}${name}.`);
    });
  }
}

export const createBoundedModel = (
  modelQueryKey,
  {
    modelClass,
    queryClient,
    initialValue,
    relations = [],
    onLazyRelationDetected = noop
  }
) => {
  const builder = new BoundModelFactory(
    queryClient,
    relations,
    onLazyRelationDetected
  );

  const entity = queryClient.getQueryData(modelQueryKey);
  if (!entity) return null;

  let normalizedEntity;
  if (initialValue) {
    normalizedEntity = initialValue;
  } else {
    const normalizer = createEntityNormalizer(
      modelClass,
      new LazyRelationsProxyHandler({
        onLazyRelationDetected
      })
    );
    normalizedEntity = normalizer(entity);
  }

  const boundModel = Array.isArray(normalizedEntity)
    ? normalizedEntity.map(entity => builder.buildRelations(entity))
    : builder.buildRelations(normalizedEntity);

  return boundModel;
};
