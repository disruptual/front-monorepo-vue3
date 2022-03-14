import { FrontConfig, FrontConfigService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useFrontConfigApi() {
  return useCRUDApi({
    model: FrontConfig,
    service: FrontConfigService,
    defaultQueryOptions: { staletime: Infinity }
  });
}
