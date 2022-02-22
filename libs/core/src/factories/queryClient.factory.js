import { QueryClient } from 'vue-query';
import { Collection } from '@dsp/business';

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 30000,
        retry: false,
        notifyOnChangeProps: 'tracked',
        onSuccess(data) {
          if (!data) return;

          if (!(data instanceof Collection)) return;
          console.log(data.uri);
          const rawJson = data.toJSON();
          rawJson['hydra:member'].forEach(entity => {
            if (!entity['@id']) return;

            queryClient.setQueryData(entity['@id'], entity);
          });
        }
      }
    }
  });

  return queryClient;
}
