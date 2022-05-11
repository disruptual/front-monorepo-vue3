<script>
export default { name: 'NotificationCard' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { Notification } from '@dsp/business';

const props = defineProps({
  notification: { type: Notification, required: true },
  target: { type: Object, required: true },
  text: { type: String, default: null },
  date: { type: String, default: null },
  actions: { type: Array, default: () => [] }
});

defineEmits(['navigate']);

const isDropdownOpened = ref(false);

const classes = computed(() => {
  return [
    !props.notification.read && 'notification-card--unread',
    'notification-card'
  ];
});
</script>

<template>
  <dsp-flex
    :class="classes"
    justify="space-between"
    wrap="nowrap"
    align="flex-start"
    gap="xl"
  >
    <router-link
      class="notification-card__link"
      :to="target"
      @click="
        $emit('navigate', { id: notification.id, read: notification.read })
      "
    >
      <slot>
        <slot name="media" />
        <div class="notification-layout__text">
          <slot name="text">
            {{ text }}
          </slot>
        </div>

        <div class="notification-layout__date">
          {{ date }}
        </div>
      </slot>
    </router-link>

    <dsp-dropdown v-model:isOpened="isDropdownOpened">
      <template #toggle>
        <dsp-icon-button icon="ellipsisH" is-plain>test-button</dsp-icon-button>
      </template>
      <template #menu>
        <dsp-dropdown-item v-for="action in actions" :key="action.label">
          <dsp-plain-button @click.stop="action.action">
            {{ action.label }}
          </dsp-plain-button>
        </dsp-dropdown-item>
      </template>
    </dsp-dropdown>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.notification-card {
  padding: 0 var(--spacing-lg);
  font-weight: var(--font-weight-light);

  &:hover {
    background-color: var(--color-brand-100);
  }
}
.notification-card__link {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  grid-gap: var(--spacing-sm);
  padding: var(--spacing-md);
}
.notification-layout__text {
  word-break: break-word;
  grid-row: 1;
  grid-column: 2;
}

.notification-layout__date {
  grid-row: 2;
  grid-column: 2;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.notification-card--unread {
  font-weight: var(--font-weight-bold);
}
</style>
