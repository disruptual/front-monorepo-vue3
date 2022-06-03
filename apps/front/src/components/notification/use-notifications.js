import { computed } from 'vue';
import { useNotificationApi, useCurrentUser } from '@dsp/core';

export const useNotifications = () => {
  const { data: currentUser } = useCurrentUser();

  const getUnReadNotificationsQuery = () =>
    useNotificationApi().findAllByUserIdQuery(
      computed(() => currentUser.value?.id),
      computed(() => ({
        enabled: !!currentUser.value?.id,
        filters: {
          read: false,
          'sort[createdAt]': 'desc'
        }
      }))
    );

  const getAllNotificationsQuery = () =>
    useNotificationApi().findAllByUserIdQuery(
      computed(() => currentUser.value?.id),
      computed(() => ({
        enabled: !!currentUser.value?.id,
        filters: {
          'sort[createdAt]': 'desc'
        }
      }))
    );
  const getUnSeenNotificationsQuery = () =>
    useNotificationApi().findAllByUserIdQuery(
      computed(() => currentUser.value?.id),
      computed(() => ({
        enabled: !!currentUser.value?.id,
        filters: {
          'sort[createdAt]': 'desc',
          viewed: false
        }
      }))
    );

  const updateManyMutationQuery = useNotificationApi().updateManyMutation();

  return {
    getUnReadNotificationsQuery,
    getAllNotificationsQuery,
    getUnSeenNotificationsQuery,
    markAsViewed: notifications =>
      updateManyMutationQuery.mutateAsync(
        notifications
          .filter(n => !n.viewed)
          .map(n => ({ id: n.id, entity: { viewed: true } }))
      )
  };
};
