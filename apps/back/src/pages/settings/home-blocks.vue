<script>
export default { name: 'SettingsHomeBlocks' };
</script>

<script setup>
import RecommendedUser from '@/components/home-blocks/recommended/user/index.vue';
import RecommendedBrand from '@/components/home-blocks/recommended/brand/index.vue';
import RecommendedCategory from '@/components/home-blocks/recommended/category/index.vue';
import HomeBlocksEditor from '@/components/home-blocks/editor/index.vue';

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { SETTINGS_HOMEPAGE_TABS as TABS } from '@/utils/constants';

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();

useBreadCrumbs('Settings homepage');

const activeTab = computed({
  get() {
    return route.query.section || TABS.EDITOR;
  },
  set(value) {
    replace({ ...route, query: { section: value } });
  }
});
</script>

<template>
  <dsp-container>
    <dsp-surface>
      <h2>Home Blocks</h2>
      <dsp-alert>
        Personalisez votre page d'accueil en définissant une liste de blocs
        mettant en valeur des annonces, utilisateurs ou marques
      </dsp-alert>

      <dsp-tabs v-model="activeTab">
        <dsp-tab
          :name="TABS.EDITOR"
          :label="t(`settings.homepage.tabs.${TABS.EDITOR}`)"
        >
          <dsp-container>
            <HomeBlocksEditor />
          </dsp-container>
        </dsp-tab>
        <dsp-tab
          :name="TABS.USER"
          :label="t(`settings.homepage.tabs.${TABS.USER}`)"
        >
          <dsp-container>
            <RecommendedUser />
          </dsp-container>
        </dsp-tab>

        <dsp-tab
          :name="TABS.BRAND"
          :label="t(`settings.homepage.tabs.${TABS.BRAND}`)"
        >
          <dsp-container>
            <RecommendedBrand />
          </dsp-container>
        </dsp-tab>

        <dsp-tab
          :name="TABS.CATEGORY"
          :label="t(`settings.homepage.tabs.${TABS.CATEGORY}`)"
        >
          <dsp-container>
            <RecommendedCategory />
          </dsp-container>
        </dsp-tab>
      </dsp-tabs>
    </dsp-surface>
  </dsp-container>
</template>
