
import { Address, AddressService } from '@dsp/business';

import { useCRUDApi } from '../useCRUDApi';


export function useAddressApi() {

  return useCRUDApi({
    model: Address,
    service: AddressService
  });
}
