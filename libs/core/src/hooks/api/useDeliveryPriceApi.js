import { DeliveryPrice, DeliveryPriceService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useDeliveryPriceApi() {
  return useCRUDApi({
    model: DeliveryPrice,
    service: DeliveryPriceService,
    defaultQueryOptions: {
      requestOptions: {
        params: { pagination: false }
      }
    }
  });
}
