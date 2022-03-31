
import { Size, SizeService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useSizeApi() {
  return useCRUDApi({ model: Size, service: SizeService });
}
