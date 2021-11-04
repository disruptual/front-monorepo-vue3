import { isObject, isString } from '@dsp/core/utils/assertions';
import { unref } from 'vue';

export const createRelationsNormalizer = () => {
  const parseRelationsObject = (relationObj, prefix = '') => {
    return Object.entries(relationObj)
      .map(([name, { queryOptions, ...definition }]) => [
        { name: `${prefix}${name}`, queryOptions },
        ...parseRelationsObject(definition, `${prefix}${name}.`)
      ])
      .flat();
  };

  return {
    normalize: relations => {
      const _relations = unref(relations);

      const normalized = isObject(_relations)
        ? parseRelationsObject(_relations)
        : _relations;

      return normalized.map(relation => {
        if (isString(relation)) return { name: relation, queryOptions: {} };

        return relation;
      });
    }
  };
};
