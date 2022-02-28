<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { HOME_TABS as TABS } from '@/utils/constants';
import { useAppContext } from '@dsp/core';

const route = useRoute();
const { replace } = useRouter();
const { t } = useI18n();

const releaseNotesModules = import.meta.globEager('./release-notes/*.md');
const appContext = useAppContext();

const releaseNotes = Object.entries(releaseNotesModules)
  .map(([path, module]) => ({
    version: path.replace('./release-notes/', '').replace('.md', ''),
    component: module.default
  }))
  .filter(({ version }) => import.meta.env.DEV || version !== 'Latest')
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
        <h2>Release Notes</h2>
        <ul class="release-notes__summary">
          <li v-for="(releaseNote, index) in releaseNotes" :key="index">
            <a :href="`#${releaseNote.version}`">
              {{ releaseNote.version }}
            </a>
          </li>
        </ul>
        <dsp-flex direction="column" gap="md">
          <dsp-surface
            v-for="(releaseNote, index) in releaseNotes"
            :key="index"
            as="article"
            class="release-note"
          >
            <a :id="releaseNote.version" />
            <component :is="releaseNote.component" />
          </dsp-surface>
        </dsp-flex>
      </dsp-tab>

      <dsp-tab
        :name="TABS.DATA_STUDIO"
        :label="t(`home.tabs.${TABS.DATA_STUDIO}`)"
      >
        <iframe
          v-if="appContext.dataStudioUrl"
          width="100%"
          height="600px"
          :src="appContext.dataStudioUrl"
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
  a {
    position: relative;
    top: calc(-1 * var(--header-height));
  }
}

.release-notes__summary {
  list-style: disc;
  a {
    color: inherit;
    line-height: 1.4;
  }
}
</style>
