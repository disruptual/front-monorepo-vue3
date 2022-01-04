import { Delivery, DeliveryService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useDeliveryApi() {
  return useCRUDApi({
    model: Delivery,
    service: DeliveryService,
    defaultQueryOptions: { staleTime: Infinity }
  });
}
