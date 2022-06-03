<script>
export default { name: 'Notification' };
</script>

<script setup>
import { computed, provide } from 'vue';
import OrderNotification from '@/components/notification/type/order/index.vue';
import { NOTIFICATION_CONTEXT_KEY } from './notification-constants';
import { useNotificationApi } from '@dsp/core';

const props = defineProps({
  notification: { type: Object, required: true }
});

const emit = defineEmits(['update']);

const notificationTypeToComponentMap = {
  order: OrderNotification
};

const component = computed(() => {
  return notificationTypeToComponentMap[props.notification.type];
});

const { mutate: updateNotification } = useNotificationApi().updateMutation({
  onSuccess() {
    emit('update');
  }
});

const toggleMarkAsRead = () => {
  updateNotification({
    id: props.notification.id,
    entity: { read: !props.notification.read }
  });
};

provide(NOTIFICATION_CONTEXT_KEY, {
  notification: computed(() => props.notification),

  toggleMarkAsRead
});
</script>

<template>
  <component :is="component" :notification="notification" />
</template>
