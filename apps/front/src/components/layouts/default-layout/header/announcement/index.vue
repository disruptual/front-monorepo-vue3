<script>
export default { name: 'HeaderAnnouncement' };
</script>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
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
const currentIndex = ref(0);

const interval = ref(null);
onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});

watch(isLoading, isLoading => {
  if (isLoading) return;
  if (interval.value) clearInterval(interval.value);

  interval.value = setInterval(() => {
    if (currentIndex.value === announcements.value.length - 1)
      currentIndex.value = 0;
    else currentIndex.value++;
  }, 10000);
});
</script>

<template>
  <div
    v-if="!isLoading && announcements.length && isDisplayed"
    v-readable-color
    class="header-announcement"
  >
    <div class="header-announcement__message-wrapper">
      <dsp-slide-transition is-group invert-on-out direction="vertical">
        <div
          v-for="(announcement, index) in announcements"
          v-show="index === currentIndex"
          :key="announcement.id"
          class="header-announcement__item"
        >
          {{ announcement.content }}
        </div>
      </dsp-slide-transition>
      <!-- We render the announcement twice, the second time with visibility hidden
           to ensure that the announcement stays the same height -->
      <div
        v-for="announcement in announcements"
        :key="announcement.id"
        class="header-announcement__item-shadow"
      >
        {{ announcement.content }}
      </div>
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
  padding: var(--spacing-xs);
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

.header-announcement__message-wrapper {
  display: grid;
  overflow: hidden;
  align-items: center;

  > * {
    grid-column: 1;
    grid-row: 1;
  }
}

.header-announcement__item-shadow {
  visibility: hidden;
}
</style>
