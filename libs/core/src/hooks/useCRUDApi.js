import { computed, unref, watchEffect } from 'vue';
import { useMutation } from 'vue-query';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';

export function useCRUDApi(
  { model, service, defaultQueryOptions = {}, defaultMutationOptions = {} },
  cb = () => ({})
) {
  const http = useHttp();
  const serviceInstance = new service({ http });
  const baseQueryKey = serviceInstance.endpoint;

  return {
    findAllQuery(findAllOptions = {}) {
      const queryKey = computed(() => {
        const { filters } = unref(findAllOptions);

        return `${baseQueryKey}?${serializeQueryString(unref(filters))}`;
      });

      const queryOptions = computed(() => {
        const {
          relations = [],
          itemsPerPage = 30,
          ...options
        } = unref(findAllOptions);

        return {
          model,
          itemsPerPage,
          relations,
          ...options
        };
      });

      const queryFn = computed(() => {
        const { itemsPerPage, requestOptions, filters } = unref(findAllOptions);
        return ({ pageParam = { page: 1, itemsPerPage } }) => {
          return serviceInstance.findAll({
            ...defaultQueryOptions,
            ...requestOptions,
            params: {
              ...(requestOptions?.params || {}),
              ...pageParam,
              ...unref(filters)
            }
          });
        };
      });

      return useCollectionQuery(queryKey, queryFn, queryOptions);
    },

    findByIdQuery(
      id,
      { relations = [], requestOptions = {}, ...options } = {}
    ) {
      const queryKey = computed(() => `${baseQueryKey}/${id}`);

      const queryOptions = computed(() => ({
        model,
        relations,
        ...defaultQueryOptions,
        ...options
      }));

      return useModelQuery(
        queryKey,
        () => serviceInstance.findById(id, requestOptions),
        queryOptions
      );
    },

    updateMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `updateMany:${baseQueryKey}`,
        ({ id, entity }) => serviceInstance.update(id, entity, requestOptions),
        { ...defaultMutationOptions, ...options }
      );
    },

    updateManyMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `update:${baseQueryKey}`,
        entities =>
          Promise.all(
            entities.map(({ id, entity }) =>
              serviceInstance.update(id, entity, requestOptions)
            )
          ),
        { ...defaultMutationOptions, ...options }
      );
    },

    createMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `create:${baseQueryKey}`,
        entity => serviceInstance.create(entity, requestOptions),
        { ...defaultMutationOptions, ...options }
      );
    },

    createManyMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `createMany:${baseQueryKey}`,
        entities =>
          Promise.all(
            entities.map(entity =>
              serviceInstance.create(entity, requestOptions)
            )
          ),
        { ...defaultMutationOptions, ...options }
      );
    },

    deleteMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `delete:${baseQueryKey}`,
        id => serviceInstance.delete(id, requestOptions),
        { ...defaultMutationOptions, ...options }
      );
    },

    deleteManyMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `deleteMany:${baseQueryKey}`,
        ids =>
          Promise.all(
            ids.map(id => serviceInstance.delete(id, requestOptions))
          ),
        { ...defaultMutationOptions, ...options }
      );
    },
    ...cb(serviceInstance, http)
  };
}
