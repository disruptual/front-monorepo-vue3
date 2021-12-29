import { computed, unref } from 'vue';
import { useMutation } from 'vue-query';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';

export function useCRUDApi({ model, service }, cb = () => ({})) {
  const http = useHttp();
  const serviceInstance = new service({ http });
  const baseQueryKey = serviceInstance.endpoint;

  return {
    findAllQuery({
      relations = [],
      itemsPerPage = 30,
      filters = {},
      requestOptions = {},
      ...options
    } = {}) {
      const queryKey = computed(
        () => `${baseQueryKey}?${serializeQueryString(unref(filters))}`
      );

      const queryOptions = computed(() => ({
        model,
        itemsPerPage,
        relations,
        ...options
      }));

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return serviceInstance.findAll({
          ...requestOptions,
          params: { ...requestOptions.params, ...pageParam, ...unref(filters) }
        });
      };

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
        `update:${baseQueryKey}`,
        ({ id, entity }) => serviceInstance.update(id, entity, requestOptions),
        options
      );
    },

    createMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `create:${baseQueryKey}`,
        entity => serviceInstance.create(entity, requestOptions),
        options
      );
    },

    deleteMutation({ requestOptions = {}, ...options } = {}) {
      return useMutation(
        `delete:${baseQueryKey}`,
        id => serviceInstance.delete(id, requestOptions),
        options
      );
    },
    ...cb(serviceInstance, http)
  };
}
