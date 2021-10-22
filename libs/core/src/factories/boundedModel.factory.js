import { Collection } from '@dsp/business';
import { createNormalizer } from './normalizer.factory';

class BoundModelFactory {
  constructor(queryClient, relations) {
    this.queryClient = queryClient;
    this.relations = relations;
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
    const isEnabled = this.relations.includes(`${prefix}${name}`);
    if (!isEnabled) return;

    const uri = getUri(entity);

    const options = {
      name,
      uri,
      prefix,
      normalizer: createNormalizer(model)
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
  { model, queryClient, relations = [] }
) => {
  const builder = new BoundModelFactory(queryClient, relations);

  const rawEntity = queryClient.getQueryData(modelQueryKey);
  if (!rawEntity) return null;

  const normalizer = createNormalizer(model);
  const normalizedEntity = normalizer(rawEntity);

  return Array.isArray(normalizedEntity)
    ? normalizedEntity.map(entity => builder.buildRelations(entity))
    : builder.buildRelations(normalizedEntity);
};
