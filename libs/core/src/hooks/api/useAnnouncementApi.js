import { computed } from 'vue';
import { Announcement, AnnouncementService } from '@dsp/business';
import { useCollectionQuery, useHttp } from '@dsp/core/index';
import { useMutation } from 'vue-query';
import { useCRUDApi } from '../useCRUDApi';

export function useAnnouncementApi() {
  return useCRUDApi(
    { model: Announcement, service: AnnouncementService },
    announcementService => ({
      findAllQuery() {
        const queryKey = computed(() => `/blocs?technicalId=header`);

        return useCollectionQuery(
          queryKey,
          () => announcementService.findAll(),
          {
            model: Announcement
          }
        );
      }
    })
  );
}
