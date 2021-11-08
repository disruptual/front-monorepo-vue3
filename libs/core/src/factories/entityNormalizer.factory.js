import { Collection } from '@dsp/business';

export const createEntityNormalizer =
  (model, proxyHandler = {}) =>
  data => {
    if (!data) return null;

    if (data.pages) {
      const allEntities = data.pages
        .flatMap(page => page['hydra:member'])
        .map(e => {
          const instance = new model(e);
          return new Proxy(instance, proxyHandler);
        });

      return new Collection({
        ...data,
        'hydra:member': allEntities,
        '@id': data.pages[0]['@id'],
        'hydra:totalItems': data.pages[0]['hydra:totalItems']
      });
    } else if (data['hydra:member']) {
      return new Collection({
        ...data,
        'hydra:member': data['hydra:member'].map(e => {
          const instance = new model(e);
          return new Proxy(instance, proxyHandler);
        })
      });
    } else {
      const instance = new model(data);
      return new Proxy(instance, proxyHandler);
    }
  };
