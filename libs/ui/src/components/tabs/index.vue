<script>
export default { name: 'DspTabs' };
</script>

<script setup>
import { provide, ref, computed, watch } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';
import { isUndefinedOrNull } from '@dsp/core';
import { useReadableColor } from '@dsp/ui/hooks/useReadableColor';

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
});
const emit = defineEmits(['update:modelValue']);

const tabs = ref([]);
const tabsContext = computed(() => ({
  tabs: tabs.value,
  activeTab: props.modelValue,
  add(tab) {
    tabs.value.push(tab);
  },
  remove(tab) {
    tabs.value.splice(tabs.value.indexOf(tab), 1);
  },
  changeTab(tabName) {
    emit('update:modelValue', tabName);
  }
}));

const orderedTabs = computed(() =>
  tabs.value.slice().sort((a, b) => {
    if (isUndefinedOrNull(a.position) && isUndefinedOrNull(b.position))
      return 0;
    if (isUndefinedOrNull(a.position)) return 1;
    if (isUndefinedOrNull(b.position)) return -1;
    return a.position - b.position;
  })
);

const menuTextColor = useReadableColor('--color-background');
provide(CONTEXT_KEYS.TABS, tabsContext);
</script>

<template>
  <div class="dsp-tabs">
    <div class="menu">
      <dsp-swiper gap="md" wrap="nowrap">
        <dsp-swiper-item v-for="tab in orderedTabs" :key="tab.name">
          <dsp-flex
            align="center"
            :class="
              tabsContext.activeTab === tab.name && 'menu-item--is-active'
            "
          >
            <slot
              name="menuItem"
              v-bind="{ tab, setActive: () => tabsContext.changeTab(tab.name) }"
            >
              <dsp-plain-button @click="tabsContext.changeTab(tab.name)">
                {{ tab.label }}
              </dsp-plain-button>
            </slot>
          </dsp-flex>
        </dsp-swiper-item>
      </dsp-swiper>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.menu {
  margin: var(--spacing-sm) auto 0;
  padding-bottom: var(--spacing-sm);
  width: fit-content;
  max-width: 100%;
  overflow-x: hidden;
  color: v-bind(menuTextColor);

  li {
    border-bottom: 2px solid var(--color-disabled);
  }
}

.menu-item--is-active {
  border-bottom: 2px solid var(--color-brand-500);
}
</style>
