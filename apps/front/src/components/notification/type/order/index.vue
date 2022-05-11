<script>
export default { name: 'NotificationOrder' };
</script>

<script setup>
import { Notification } from '@dsp/business';
import { useNotificationApi, useCurrentUser } from '@dsp/core';
import NotificationCard from '@/components/notification/card/index.vue';

const props = defineProps({
  notification: { type: Notification, required: true },
  query: { type: Object, default: null }
});

const { data: currentUser } = useCurrentUser();

const { mutateAsync: updateNotification } = useNotificationApi().updateMutation(
  {
    onSuccess() {
      props.query.refetch.value();
    }
  }
);

const toggleMarkAsRead = ({ id, read }) => {
  updateNotification({
    id,
    entity: { read: !read }
  });
  props.query.refetch.value();
};

const actionsCard = notification => {
  return [
    {
      label: notification.read ? 'Marquer comme non lue' : 'Marquer comme lue',
      action: () => toggleMarkAsRead(notification)
    }
  ];
};
</script>

<template>
  <NotificationCard
    :target="{}"
    text="notification.translation"
    :date="notification.formatedCreatedAt"
    :notification="notification"
    :actions="actionsCard(notification)"
    @navigate="toggleMarkAsRead(notification)"
  >
    <template #media>
      <dsp-avatar :user="currentUser" />
    </template>
  </NotificationCard>
</template>
