<script>
export default { name: 'NotificationDropdownMenu' };
</script>

<script setup>
import { ref, useSlots } from 'vue';
import { useQueryClient } from 'vue-query';
import { NOTIFICATION_TABS as TABS } from '@/utils/constants';
import Notification from '@/components/notification/index.vue';
import { useNotifications } from '../../use-notifications';

const { getNotificationsAllQuery } = useNotifications();
const notificationsAllQuery = getNotificationsAllQuery();
const queryClient = useQueryClient();

const slots = useSlots();
const activeTab = ref(TABS.ALL);

const onUpdate = () => {
  queryClient.invalidateQueries({
    predicate: ({ queryKey }) => queryKey.includes('notifications?')
  });
};
</script>

<template>
  <dsp-center class="notification-dropdown-menu">
    <dsp-tabs v-model="activeTab">
      <dsp-tab :name="TABS.ALL" label="Tout">
        <dsp-infinite-query-loader
          v-slot="{ data: notifications }"
          :query="notificationsAllQuery"
        >
          <ul>
            <li
              v-if="slots.firstItemList"
              class="notification-dropdown-menu__first-item"
            >
              <slot name="firstItemList" />
            </li>
            <li v-for="notification in notifications" :key="notification.id">
              <Notification :notification="notification" @update="onUpdate" />
            </li>
          </ul>
        </dsp-infinite-query-loader>
      </dsp-tab>

      <dsp-tab :name="TABS.MESSAGE" label="Messages">
        <ul>
          <li>Mes messages</li>
        </ul>
      </dsp-tab>
    </dsp-tabs>
  </dsp-center>
</template>

<style lang="scss" scoped>
.notification-dropdown-menu {
  // fix width element because poppers lib
  // doesn't calcul the right width after that datas are loaded
  width: 30em;
}

.notification-dropdown-menu__first-item {
  padding: 0 var(--spacing-lg);
  text-decoration: underline;
}
</style>
