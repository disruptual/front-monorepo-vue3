<script>
export default { name: 'NotificationsPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useNotificationApi, useCurrentUser } from '@dsp/core';
import { NOTIFICATION_TABS as TABS } from '@/utils/constants';
import Notification from '@/components/notification/index.vue';

const { replace } = useRouter();
const route = useRoute();

const activeTab = computed({
  get() {
    return route.query.section || TABS.ALL;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});

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

const notificationUnreadQuery = useNotificationApi().findAllByUserIdQuery(
  computed(() => currentUser.value.id),
  computed(() => ({
    enabled: !!currentUser.value.id,
    filters: {
      read: false,
      'sort[createdAt]': 'desc'
    }
  }))
);

const onUpdate = () => {
  notificationAllQuery.refetch.value();
  notificationUnreadQuery.refetch.value();
};
</script>

<template>
  <dsp-surface>
    <dsp-container>
      <dsp-section>
        <dsp-center>
          <dsp-section-heading>Mes notifications</dsp-section-heading>
          <dsp-tabs v-model="activeTab">
            <dsp-tab :name="TABS.ALL" label="Tout">
              <dsp-infinite-query-loader
                v-slot="{ data: notifications }"
                :query="notificationAllQuery"
              >
                <ul>
                  <li
                    v-for="notification in notifications"
                    :key="notification.id"
                  >
                    <Notification
                      :notification="notification"
                      @update="onUpdate"
                    />
                  </li>
                </ul>
              </dsp-infinite-query-loader>
            </dsp-tab>

            <dsp-tab :name="TABS.UNREAD" label="Non lues">
              <dsp-infinite-query-loader
                v-slot="{ data: notifications }"
                :query="notificationUnreadQuery"
              >
                <ul>
                  <li
                    v-for="notification in notifications"
                    :key="notification.id"
                  >
                    <Notification
                      :notification="notification"
                      @update="onUpdate"
                    />
                  </li>
                </ul>
              </dsp-infinite-query-loader>
            </dsp-tab>
          </dsp-tabs>
        </dsp-center>
      </dsp-section>
    </dsp-container>
  </dsp-surface>
</template>
