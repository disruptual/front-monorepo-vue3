import { Announcement, AnnouncementService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useAnnouncementApi() {
  return useCRUDApi({ model: Announcement, service: AnnouncementService });
}
