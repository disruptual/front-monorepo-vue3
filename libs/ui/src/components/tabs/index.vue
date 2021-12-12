<script>
export default { name: 'DspTabs' };
</script>

<script setup>
import { provide, ref, computed } from 'vue';
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
  tabs.value
    .slice()
    .sort((a, b) => {
      if (isUndefinedOrNull(a.position) && isUndefinedOrNull(b.position))
        return 0;
      if (isUndefinedOrNull(a.position)) return 1;
      if (isUndefinedOrNull(b.position)) return -1;
      return a.position - b.position;
    })
    .map(tab => ({
      ...tab,
      isActive: tabsContext.value.activeTab === tab.name
    }))
);

const menuTextColor = useReadableColor('--color-background');
provide(CONTEXT_KEYS.TABS, tabsContext);
</script>

<template>
  <dsp-menu v-slot="{ item }" :items="orderedTabs">
    <slot
      name="menuItem"
      v-bind="{ tab: item, setActive: () => tabsContext.changeTab(item.name) }"
    >
      <dsp-plain-button @click="tabsContext.changeTab(item.name)">
        {{ item.label }}
      </dsp-plain-button>
    </slot>
  </dsp-menu>
  <slot />
</template>
