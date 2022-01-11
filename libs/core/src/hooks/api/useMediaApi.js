import { Media, MediaService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useMediaApi() {
  return useCRUDApi({
    model: Media,
    service: MediaService
  });
}
