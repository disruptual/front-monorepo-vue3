<script>
export default { name: 'DspTab' };
</script>

<script setup>
import { inject, onUnmounted, watch } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const tabsContext = inject(CONTEXT_KEYS.TABS);
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false,
    default: null
  },
  position: { type: Number, default: null }
});

const tab = {
  name: props.name,
  label: props.label,
  position: props.position
};

tabsContext.value.add(tab);

onUnmounted(() => {
  tabsContext.value.remove(tab);
});
</script>

<template>
  <slot v-if="tabsContext.activeTab === props.name" />
</template>
