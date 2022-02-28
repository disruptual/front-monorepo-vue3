<script>
export default { name: 'HeaderAnnouncement' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useAnnouncementApi } from '@dsp/core';
import { vReadableColor } from '@dsp/ui';
import schema from './index.schema';

const props = defineProps(schema.toProps());

const context = schema.toContext(props);

const now = new Date().toISOString();
const { isLoading, data: announcements } = useAnnouncementApi().findAllQuery({
  requestOptions: {
    technicalId: 'header',
    'startAt[before]': now,
    'endAt[after]': now
  }
});

const isDisplayed = ref(true);
const isClosable = computed(() => announcements.value?.every(a => a.closable));
</script>

<template>
  <div
    v-if="!isLoading && isDisplayed"
    v-readable-color
    class="header-announcement"
  >
    <div
      v-for="announcement in announcements"
      :key="announcement.id"
      class="header-announcement__item"
    >
      {{ announcement.content }}
    </div>
    <dsp-icon-button
      v-if="isClosable"
      icon="remove"
      class="header-announcement__close-button"
      aria-label="fermer le message"
      @click="isDisplayed = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.header-announcement {
  padding: var(--spacing-sm);
  background-color: v-bind('context.backgroundColor');
  position: relative;
}

.header-announcement__item {
  text-align: center;
}

.header-announcement__close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
