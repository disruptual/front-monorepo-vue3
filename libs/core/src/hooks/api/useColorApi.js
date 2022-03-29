import { Color, ColorService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useColorApi() {
  return useCRUDApi({
    model: Color,
    service: ColorService,
    defaultQueryOptions: { staleTime: Infinity }
  });
}
