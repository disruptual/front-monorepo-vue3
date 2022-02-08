<script>
export default { name: 'DspDevtools' };
</script>

<script setup>
import { inject, ref, computed } from 'vue';
import { set } from 'lodash-es';
import { useAppContext } from '@dsp/core';
import ComponentForm from './component-form.vue';

const devtoolsContext = inject('devtoolsContext');
const appContext = useAppContext();
if (devtoolsContext.options.isDetached) {
  Object.assign(appContext, window.disruptualDevtoolsInitialState);
}

const isPopupOpened = ref(false);
const detach = () => {
  let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=800,height=600,left=100,top=100`;

  const popup = window.open('/?devtools=1', 'devtools', params);
  popup.disruptualDevtoolsInitialState = appContext;
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

const onUpdate = ({ path, value }) => {
  if (devtoolsContext.options.isDetached) {
    window.opener.disruptualDevtoolsUpdate({ path, value });
  }
  set(appContext, path, value);
};
window.disruptualDevtoolsUpdate = onUpdate;

const tabs = [
  { name: 'components', label: 'Composants' },
  { name: 'colors', label: 'Couleurs' },
  { name: 'typography', label: 'Typography' },
  { name: 'icons', label: 'Icônes' },
  { name: 'translations', label: 'Wordings' }
];
</script>

<template>
  <dsp-icon-button
    v-if="!devtoolsContext.options.isDetached"
    icon="settings"
    class="toggle"
    @click="isDisplayed = !isDisplayed"
  />
  <dsp-surface
    v-if="isConsoleDisplayed"
    class="console"
    :class="devtoolsContext.options.isDetached && 'console--is-detached'"
  >
    <dsp-flex as="header" justify="space-between" align="center">
      <h2>Devtools</h2>
      <dsp-menu :items="tabs" />
      <dsp-button
        v-if="!$route.query.devtools"
        is-outlined
        size="sm"
        @click="detach"
      >
        Detach
      </dsp-button>
    </dsp-flex>
    <ul>
      <li v-for="(value, key) in devtoolsContext.schema" :key="key">
        <ComponentForm :component="key" :schema="value" @update="onUpdate" />
      </li>
    </ul>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.toggle {
  border-radius: 50%;
  position: fixed;
  right: var(--spacing-md);
  bottom: var(--spacing-md);
  z-index: 9999;
}

.console {
  padding: 0 var(--spacing-md) var(--spacing-md) !important;
  &:not(.console--is-detached) {
    position: sticky;
    z-index: 9998;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 40vh;
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
