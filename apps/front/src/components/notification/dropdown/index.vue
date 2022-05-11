<script>
export default { name: 'NotificationsDropdown' };
</script>

<script setup>
import { ref } from 'vue';
import NotificationDropdownMenu from './menu/index.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});

const isOpened = ref(false);
</script>

<template>
  <dsp-dropdown v-model:isOpened="isOpened" :close-on-focus-outside="false">
    <template #toggle>
      <dsp-icon icon="bell" is-plain size="lg" aria-label="notifications" />
    </template>
    <template #menu>
      <dsp-dropdown-item :auto-close="false">
        <NotificationDropdownMenu>
          <template #firstItemList>
            <dsp-flex justify="flex-end">
              <dsp-plain-button :to="{ name: 'Notifications' }">
                voir tout
              </dsp-plain-button>
            </dsp-flex>
          </template>
        </NotificationDropdownMenu>
      </dsp-dropdown-item>
    </template>
  </dsp-dropdown>
</template>
