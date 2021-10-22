import { useMutation, useQueryClient } from 'vue-query';
import { extractIdFromUri } from '../utils/helpers';
import { useHttp } from './useHttp';

const patchCollection = (oldData, newData) => {
  // using lodash.merge() makes the query not pick up updates for some reason
  return {
    ...oldData,
    'hydra:member': oldData['hydra:member'].map(entity =>
      entity['@id'] === newData['@id'] ? { ...entity, ...newData } : entity
    )
  };
};

export function useCRUDService(Service) {
  const http = useHttp();
  const queryClient = useQueryClient();
  const service = new Service({ http });

  const onCreateSuccess = newData => {
    queryClient.setQueryData(newData['@id'], newData);
  };

  const onUpdateSuccess = newData => {
    queryClient.setQueriesData(
      {
        predicate: ({ queryKey }) => queryKey.startsWith(service.endpoint)
      },
      oldData => {
        if (oldData['hydra:member']) {
          return patchCollection(oldData, newData);
        } else if (oldData['@id'] === newData['@id']) {
          return { ...oldData, ...newData };
        }

        return oldData;
      }
    );
  };

  const createMutation = useMutation(
    ({ entity }) => service.create({ data: entity }),
    {
      mutationKey: `${Service.name}:create`,
      onSuccess: onCreateSuccess
    }
  );

  const updateMutation = useMutation(
    ({ id, entity }) =>
      service.update.put(extractIdFromUri(id), { data: entity }),
    { mutationKey: `${Service.name}:delete`, onSuccess: onUpdateSuccess }
  );

  const deleteMutation = useMutation(
    id => service.delete(extractIdFromUri(id)),
    {
      mutationKey: `${Service.name}:delete`
    }
  );

  return {
    createMutation,
    create: createMutation.mutateAsync,

    updateMutation,
    update: updateMutation.mutateAsync,

    deleteMutation,
    delete: deleteMutation.mutateAsync
  };
}
