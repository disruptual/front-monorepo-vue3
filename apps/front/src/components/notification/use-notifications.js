import { computed } from 'vue';
import { useNotificationApi, useCurrentUser } from '@dsp/core';

export const useNotifications = () => {
  const { data: currentUser } = useCurrentUser();

  const getNotificationsUnreadQuery = () =>
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

  const getNotificationsAllQuery = () =>
    useNotificationApi().findAllByUserIdQuery(
      computed(() => currentUser.value?.id),
      computed(() => ({
        enabled: !!currentUser.value?.id,
        filters: {
          'sort[createdAt]': 'desc'
        }
      }))
    );
  const getNotificationsUnSeenQuery = () =>
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
    getNotificationsUnreadQuery,
    getNotificationsAllQuery,
    getNotificationsUnSeenQuery,
    markAsViewed: notifications =>
      updateManyMutationQuery.mutateAsync(
        notifications
          .filter(n => !n.viewed)
          .map(n => ({ id: n.id, entity: { viewed: true } }))
      )
  };
};
