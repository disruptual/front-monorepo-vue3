import { Event, EventService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useEventApi() {
  return useCRUDApi({ model: Event, service: EventService });
}
