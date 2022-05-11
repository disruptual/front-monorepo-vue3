import { Notification, NotificationService } from '@dsp/business';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery.js';
import { computed, unref } from 'vue';
import { useCRUDApi } from '../useCRUDApi';
import { deepUnref, serializeQueryString } from '@dsp/core/utils';

export function useNotificationApi() {
  return useCRUDApi(
    { model: Notification, service: NotificationService },
    notificationService => ({
      findAllByUserIdQuery(userId, options) {
        const queryKey = computed(() => {
          const { filters } = deepUnref(options);

          return `/users/${unref(userId)}/notifications?${serializeQueryString(
            filters
          )}`;
        });

        const queryOptions = computed(() => {
          const {
            relations = [],
            itemsPerPage = Infinity,
            ...rest
          } = deepUnref(options);

          return {
            model: Notification,
            itemsPerPage,
            relations,
            ...rest
          };
        });

        const queryFn = computed(() => {
          const { itemsPerPage, requestOptions, filters } = deepUnref(options);
          return ({ pageParam = { page: 1, itemsPerPage } }) => {
            return notificationService.findAllByUserId(unref(userId), {
              ...requestOptions,
              params: {
                ...(requestOptions?.params || {}),
                ...pageParam,
                ...unref(filters)
              }
            });
          };
        });

        return useCollectionQuery(queryKey, queryFn, queryOptions);
      }
    })
  );
}
