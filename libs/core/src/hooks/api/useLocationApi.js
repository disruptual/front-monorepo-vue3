
import { Location, LocationService } from '@dsp/business';

import { useCRUDApi } from '../useCRUDApi';


export function useLocationApi() {

  return useCRUDApi({
    model: Location,
    service: LocationService
  });
}
