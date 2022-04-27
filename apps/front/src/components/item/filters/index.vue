<script>
export default { name: 'ItemFilters' };
</script>

<script setup>
import { computed } from 'vue';
import ItemFiltersCategory from './category/index.vue';
import ItemFiltersBrand from './brand/index.vue';
import ItemFiltersColor from './color/index.vue';
import ItemFiltersSize from './size/index.vue';
import ItemFiltersCondition from './condition/index.vue';
import ItemFiltersPrice from './price/index.vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  count: { type: Number, default: null }
});

const emit = defineEmits(['update:modelValue']);
const vModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});
</script>

<template>
  <dsp-flex justify="space-between" align="center">
    <dsp-filter-bar v-model="vModel">
      <ItemFiltersCategory />
      <ItemFiltersBrand />
      <ItemFiltersColor />
      <ItemFiltersSize />
      <ItemFiltersCondition />
      <ItemFiltersPrice />
    </dsp-filter-bar>
    <div>{{ count }} résultats</div>
  </dsp-flex>
</template>
