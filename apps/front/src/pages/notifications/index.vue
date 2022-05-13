<script>
export default { name: 'NotificationsPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NOTIFICATION_TABS as TABS } from '@/utils/constants';
import Notification from '@/components/notification/index.vue';
import { useNotifications } from '@/components/notification/use-notifications';

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

const { notificationAllQuery, notificationUnreadQuery } = useNotifications();

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
