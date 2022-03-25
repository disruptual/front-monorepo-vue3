<script>
export default { name: 'FilterBarItem' };
</script>

<script setup>
import { inject, useSlots, watch } from 'vue';
import { CONTEXT_KEYS } from '@dsp/ui/utils/constants';

const props = defineProps({
  name: { type: String, required: true },
  multiple: { type: Boolean, default: false },
  label: { type: String, required: true },
  modelValue: { type: null, default: null }
});
const slots = useSlots();

const filterContext = inject(CONTEXT_KEYS.FILTER_BAR);
filterContext.register(props.name, {
  initialValue: props.initialValue,
  template: slots.default,
  resultTemplate: slots.result,
  multiple: props.multiple,
  label: props.label
});

watch(
  () => props.modelValue,
  value => {
    filterContext.setFilter(props.name, value);
  }
);
</script>

<template>
  <div v-if="false" />
</template>
