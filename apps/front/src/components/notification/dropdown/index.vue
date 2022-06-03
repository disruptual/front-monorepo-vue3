<script>
export default { name: 'NotificationsDropdown' };
</script>

<script setup>
import { ref, computed, watch } from 'vue';
import NotificationDropdownMenu from './menu/index.vue';
import { useNotifications } from '../use-notifications';

defineProps({
  modelValue: { type: Boolean, default: false }
});

const isOpened = ref(false);

const { getUnSeenNotificationsQuery, markAsViewed } = useNotifications();

const unSeenNotificationsQuery = getUnSeenNotificationsQuery();

const notificationCount = computed(
  () => unSeenNotificationsQuery.data.value?.totalItems
);

watch(
  () => isOpened.value,
  newVal => {
    if (newVal) markAsViewed(unSeenNotificationsQuery.data.value);
  }
);
</script>

<template>
  <dsp-chip-count
    type="alert"
    :count="notificationCount"
    :is-count-displayed="!!notificationCount"
  >
    <dsp-dropdown v-model:isOpened="isOpened" :close-on-focus-outside="false">
      <template #toggle>
        <dsp-icon icon="bell" is-plain size="lg" aria-label="notifications" />
      </template>
      <template #menu>
        <dsp-dropdown-item :auto-close="false">
          <NotificationDropdownMenu>
            <template #firstItemList>
              <dsp-flex justify="flex-end">
                <dsp-plain-button
                  :to="{ name: 'Notifications' }"
                  @click="isOpened = false"
                >
                  voir tout
                </dsp-plain-button>
              </dsp-flex>
            </template>
          </NotificationDropdownMenu>
        </dsp-dropdown-item>
      </template>
    </dsp-dropdown>
  </dsp-chip-count>
</template>
