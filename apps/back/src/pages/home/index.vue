<script setup>
import config from 'client/config.js';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { HOME_TABS as TABS } from '@/utils/constants';

const route = useRoute();
const { replace } = useRouter();
const { t } = useI18n();

const releaseNotesModules = import.meta.globEager('./release-notes/*.md');

const releaseNotesComponents = Object.values(releaseNotesModules)
  .map(module => module.default)
  .reverse();

const activeTab = computed({
  get() {
    return route.query.section || TABS.RELEASE;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});
</script>

<template>
  <dsp-container>
    <dsp-tabs v-model="activeTab">
      <dsp-tab :name="TABS.RELEASE" :label="t(`home.tabs.${TABS.RELEASE}`)">
        <dsp-container>
          <h2>Release Notes</h2>
          <dsp-flex direction="column" gap="md">
            <dsp-surface
              v-for="(component, index) in releaseNotesComponents"
              :key="index"
              as="article"
              class="release-note"
            >
              <component :is="component" />
            </dsp-surface>
          </dsp-flex>
        </dsp-container>
      </dsp-tab>

      <dsp-tab
        :name="TABS.DATA_STUDIO"
        :label="t(`home.tabs.${TABS.DATA_STUDIO}`)"
      >
        <iframe
          v-if="config.dataStudio"
          width="100%"
          height="600px"
          :src="config.dataStudio"
        />
        <dsp-surface v-else>
          <dsp-center>
            {{ t('home.dataStudioDisabled') }}
          </dsp-center>
        </dsp-surface>
      </dsp-tab>
    </dsp-tabs>
  </dsp-container>
</template>

<style lang="scss" scoped>
.release-note {
  :deep(ul) {
    list-style-type: disc;
  }

  :deep(li) {
    margin-bottom: var(--spacing-sm);
  }
}
</style>
