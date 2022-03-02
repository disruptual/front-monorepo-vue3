<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { HOME_TABS as TABS } from '@/utils/constants';
import { useAppContext } from '@dsp/core';

import Onboarding from '@/components/onboarding/index.vue';
import ReleaseNotes from '@/components/release-notes/index.vue';

const route = useRoute();
const { replace } = useRouter();
const { t } = useI18n();

const activeTab = computed({
  get() {
    return route.query.section || TABS.ONBOARDING;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});

const appContext = useAppContext();
</script>

<template>
  <dsp-container>
    <dsp-tabs v-model="activeTab">
      <dsp-tab
        :name="TABS.ONBOARDING"
        :label="t(`home.tabs.${TABS.ONBOARIDNG}`)"
      >
        <Onboarding />
      </dsp-tab>
      <dsp-tab :name="TABS.RELEASE" :label="t(`home.tabs.${TABS.RELEASE}`)">
        <ReleaseNotes />
      </dsp-tab>

      <dsp-tab
        v-if="appContext.dataStudioUrl"
        :name="TABS.DATA_STUDIO"
        :label="t(`home.tabs.${TABS.DATA_STUDIO}`)"
      >
        <iframe width="100%" height="600px" :src="appContext.dataStudioUrl" />
      </dsp-tab>
    </dsp-tabs>
  </dsp-container>
</template>
