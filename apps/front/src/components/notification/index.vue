<script>
export default { name: 'Notification' };
</script>

<script setup>
import { computed } from 'vue';
import OrderNotification from '@/components/notification/type/order/index.vue';

const props = defineProps({
  notification: { type: Object, required: true },
  query: { type: Object, default: null }
});

const notificationTypeToComponentMap = {
  order: OrderNotification
};

const component = computed(() => {
  return notificationTypeToComponentMap[props.notification.type];
});
</script>

<template>
  <component :is="component" :notification="notification" :query="query" />
</template>
