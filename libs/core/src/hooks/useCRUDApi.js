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
      ...options
    } = {}) {
      const queryKey = computed(
        () => `${baseQueryKey}?${serializeQueryString(unref(filters))}`
      );

      const queryOptions = computed(() => ({
        model: model,
        itemsPerPage,
        relations,
        ...options
      }));

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return serviceInstance.findAll({
          params: { ...pageParam, ...unref(filters) }
        });
      };

      return useCollectionQuery(queryKey, queryFn, queryOptions);
    },

    findByIdQuery(id, { relations = [], ...options } = {}) {
      const queryKey = computed(() => `${baseQueryKey}/${id}`);

      const queryOptions = computed(() => ({
        model: model,
        relations,
        ...options
      }));

      return useModelQuery(
        queryKey,
        () => serviceInstance.findById(id),
        queryOptions
      );
    },

    updateMutation(options) {
      return useMutation(
        `update:${baseQueryKey}`,
        ({ id, entity }) => serviceInstance.update(id, entity),
        options
      );
    },

    createMutation(options) {
      return useMutation(
        `create:${baseQueryKey}`,
        entity => serviceInstance.create(entity),
        options
      );
    },

    deleteMutation(options) {
      return useMutation(
        `delete:${baseQueryKey}`,
        id => serviceInstance.delete(id),
        options
      );
    },
    ...cb(serviceInstance, http)
  };
}
