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

const isDisplayed = ref(false);
const isConsoleDisplayed = computed(() => {
  if (devtoolsContext.options.isDetached) {
    return true;
  }
  return isDisplayed.value && !isPopupOpened.value;
});

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
  <dsp-icon-button
    v-if="!devtoolsContext.options.isDetached"
    icon="settings"
    class="toggle"
    aria-label="open Disruptual devtools"
    @click="isDisplayed = !isDisplayed"
  />
  <dsp-slide-transition
    :is-visible="isConsoleDisplayed"
    direction="vertical"
    class="console"
    :class="devtoolsContext.options.isDetached && 'console--is-detached'"
  >
    <dsp-surface>
      <dsp-flex as="header" justify="space-between" align="center">
        <h2>Devtools</h2>
        <dsp-menu :items="tabs" @click="onMenuClick" />
        <dsp-button
          v-if="!$route.query.devtools"
          is-outlined
          size="sm"
          @click="detach"
        >
          Detach
        </dsp-button>
      </dsp-flex>
      <component :is="currentPanel" />
    </dsp-surface>
  </dsp-slide-transition>
</template>

<style lang="scss" scoped>
.toggle {
  border-radius: 50%;
  position: fixed;
  right: var(--spacing-md);
  bottom: var(--spacing-md);
  z-index: 9999;
  @include mobile-only {
    bottom: var(--spacing-xl);
    right: var(--spacing-sm);
  }
}

.console {
  > * {
    padding: 0 var(--spacing-md) var(--spacing-md) !important;
    height: 100%;
    overflow-y: auto;
  }
  &:not(.console--is-detached) {
    position: sticky;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40vh;
    overflow: auto;
    box-shadow: 0 -5px 5px 0 rgba(0, 0, 0, 0.15);
  }

  header {
    position: sticky;
    top: 0;
    padding: 0;
    background-color: inherit;
    border-bottom: solid 1px var(--color-gray-200);
  }
}
</style>
