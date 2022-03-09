import { Brand, BrandService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useBrandApi() {
  return useCRUDApi({ model: Brand, service: BrandService });
}
