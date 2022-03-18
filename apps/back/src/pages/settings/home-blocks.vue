<script>
export default { name: 'SettingsHomeBlocks' };
</script>

<script setup>
import HomeBlocksRecommendationUser from '@/components/home-blocks/home-blocks-recommendation/user/index.vue';
import HomeBlocksRecommendationBrand from '@/components/home-blocks/home-blocks-recommendation/brand/index.vue';
import HomeBlocksRecommendationCategory from '@/components/home-blocks/home-blocks-recommendation/category/index.vue';
import HomeBlocksEditor from '@/components/home-blocks/home-blocks-editor/index.vue';

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { SETTINGS_HOMEPAGE_TABS as TABS } from '@/utils/constants';
import { useCurrentUser } from '@dsp/core';
import { USER_ROLES } from '@dsp/business';

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();
const { data: currentUser } = useCurrentUser();

useBreadCrumbs('Settings homepage');

const activeTab = computed({
  get() {
    if (currentUser.value.isProjectManager) {
      return route.query.section || TABS.EDITOR;
    }
    return route.query.section || TABS.USER;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});
</script>

<template>
  <dsp-container>
    <dsp-surface class="home-editor-page">
      <h2>Home Blocks</h2>
      <dsp-alert>
        Personalisez votre page d'accueil en définissant une liste de blocs
        mettant en valeur des annonces, utilisateurs ou marques
      </dsp-alert>

      <dsp-tabs v-model="activeTab">
        <dsp-tab
          v-if="currentUser.isProjectManager"
          :name="TABS.EDITOR"
          :label="t(`settings.homepage.tabs.${TABS.EDITOR}`)"
        >
          <HomeBlocksEditor />
        </dsp-tab>
        <dsp-tab
          :name="TABS.USER"
          :label="t(`settings.homepage.tabs.${TABS.USER}`)"
        >
          <HomeBlocksRecommendationUser />
        </dsp-tab>

        <dsp-tab
          :name="TABS.BRAND"
          :label="t(`settings.homepage.tabs.${TABS.BRAND}`)"
        >
          <HomeBlocksRecommendationBrand />
        </dsp-tab>

        <dsp-tab
          :name="TABS.CATEGORY"
          :label="t(`settings.homepage.tabs.${TABS.CATEGORY}`)"
        >
          <HomeBlocksRecommendationCategory />
        </dsp-tab>
      </dsp-tabs>
    </dsp-surface>
  </dsp-container>
</template>

<style lang="scss" scoped>
.home-editor-page {
  @include mobile-only {
    padding: var(--spacing-sm) !important;
  }
}
</style>
