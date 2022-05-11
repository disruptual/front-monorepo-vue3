<script>
export default { name: 'NotificationDropdownMenu' };
</script>

<script setup>
import { computed, ref, useSlots } from 'vue';
import { NOTIFICATION_TABS as TABS } from '@/utils/constants';
import { useNotificationApi, useCurrentUser } from '@dsp/core';
import Notification from '@/components/notification/index.vue';

const slots = useSlots();

const { data: currentUser } = useCurrentUser();

const notificationAllQuery = useNotificationApi().findAllByUserIdQuery(
  computed(() => currentUser.value.id),
  computed(() => ({
    enabled: !!currentUser.value.id,
    filters: {
      'sort[createdAt]': 'desc'
    }
  }))
);

const activeTab = ref(TABS.ALL);
</script>

<template>
  <dsp-center>
    <dsp-tabs v-model="activeTab">
      <dsp-tab :name="TABS.ALL" label="Tout">
        <dsp-infinite-query-loader
          v-slot="{ data: notifications }"
          :query="notificationAllQuery"
        >
          <ul>
            <li v-if="slots.firstItemList">
              <slot name="firstItemList" />
            </li>
            <li v-for="notification in notifications" :key="notification.id">
              <Notification
                :notification="notification"
                :query="notificationAllQuery"
              />
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
