<script>
export default { name: 'DspDevtools' };
</script>

<script setup>
import { inject, ref, computed, markRaw } from 'vue';
import { PANELS } from '../constants';
import ColorsPanel from './panels/colors.vue';
import ComponentsPanel from './panels/components.vue';
import GlobalPanel from './panels/global.vue';
import IconsPanel from './panels/icons.vue';
import TranslationsPanel from './panels/translations.vue';
import TypographyPanel from './panels/typography.vue';

const devtoolsContext = inject('devtoolsContext');

const isPopupOpened = ref(false);
const detach = () => {
  const popup = devtoolsContext.createPopup();
  isPopupOpened.value = true;
  popup.onbeforeunload = () => {
    isPopupOpened.value = false;
  };
};

const tabs = ref([
  { name: PANELS.GLOBAL, label: 'Global', component: markRaw(GlobalPanel) },
  {
    name: PANELS.COMPONENTS,
    label: 'Composants',
    component: markRaw(ComponentsPanel),
    isActive: true
  },
  { name: PANELS.COLORS, label: 'Couleurs', component: markRaw(ColorsPanel) },
  {
    name: PANELS.TYPOGRAPHY,
    label: 'Typographie',
    component: markRaw(TypographyPanel)
  },
  { name: PANELS.ICONS, label: 'Icônes', component: markRaw(IconsPanel) },
  {
    name: PANELS.TRANSLATIONS,
    label: 'Traductions',
    component: markRaw(TranslationsPanel)
  }
]);
const onMenuClick = tabName => {
  tabs.value.forEach(tab => {
    tab.isActive = tab.name === tabName;
  });
};

const currentPanel = computed(
  () => tabs.value.find(tab => tab.isActive).component
);
</script>

<template>
  <dsp-flex as="header" justify="space-between" align="center">
    <h2>Devtools</h2>
    <dsp-menu :items="tabs" @click="onMenuClick" />
  </dsp-flex>
  <component :is="currentPanel" />
</template>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  padding: 0;
  background-color: inherit;
  border-bottom: solid 1px var(--color-gray-200);
}
</style>
