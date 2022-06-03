<script>
export default { name: 'NotificationOrder' };
</script>

<script setup>
import { computed } from 'vue';
import { Order } from '@dsp/business';
import { useCurrentUser, useModelQuery, useHttp } from '@dsp/core';
import NotificationCard from '@/components/notification/card/index.vue';
import { useNotification } from '../../use-notification';

const { notification, toggleMarkAsRead } = useNotification();

const http = useHttp();

const query = useModelQuery(
  computed(() => notification.value.relatedResourceUri),
  () => http.get(notification.value.relatedResourceUri),
  computed(() => ({ model: Order }))
);

const { data: currentUser } = useCurrentUser();

const text = computed(
  () => `notification translation for order ${query.data.value?.id}`
);
</script>

<template>
  <NotificationCard
    :target="{}"
    :text="text"
    :date="notification.formatedCreatedAt"
    @navigate="toggleMarkAsRead()"
  >
    <template #media>
      <dsp-avatar :user="currentUser" />
    </template>
  </NotificationCard>
</template>
