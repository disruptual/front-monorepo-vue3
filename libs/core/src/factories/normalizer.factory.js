import { Collection } from '@dsp/business';

export const createNormalizer = model => data => {
  if (!data) return null;

  if (data.pages) {
    const allEntities = data.pages
      .flatMap(page => page['hydra:member'])
      .map(e => new model(e));

    return new Collection({
      ...data,
      'hydra:member': allEntities,
      '@id': data.pages[0]['@id'],
      'hydra:totalItems': data.pages[0]['hydra:totalItems']
    });
  }

  return data['hydra:member']
    ? new Collection({
        ...data,
        'hydra:member': data['hydra:member'].map(e => new model(e))
      })
    : new model(data);
};
