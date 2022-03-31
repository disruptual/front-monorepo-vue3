
import { OrderAddress, OrderAddressService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useOrderAddressApi() {
  return useCRUDApi({ model: OrderAddress, service: OrderAddressService });
}
