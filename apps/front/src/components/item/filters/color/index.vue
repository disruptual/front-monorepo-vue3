<script>
export default { name: 'ItemFiltersColor' };
</script>

<script setup>
import { inject, computed, ref } from 'vue';
import { useColorApi } from '@dsp/core';
import { CONTEXT_KEYS } from '@dsp/ui';
import ColorPreview from '@/components/color/preview/index.vue';

const query = useColorApi().findAllQuery();
const { data: colors } = query;
const { filters, setFilter } = inject(CONTEXT_KEYS.FILTER_BAR);

const vModel = computed({
  get() {
    return filters.value?.['colors.id'].value;
  },
  set(val) {
    setFilter('colors.id', val);
  }
});
</script>

<template>
  <dsp-filter-bar-item label="Couleur" name="colors.id" multiple>
    <dsp-query-loader :query="query">
      <dsp-grid
        as="ul"
        :columns="3"
        gap="md"
        justify="center"
        class="item-filters-color"
      >
        <li v-for="color in colors" :key="color.id">
          <label>
            <dsp-visually-hidden>
              <dsp-checkbox
                v-model="vModel"
                :label="color.name"
                :value="color.id"
              />
            </dsp-visually-hidden>
            <ColorPreview
              :color="color"
              :class="
                vModel.includes(color.id) && 'item-filter-color--selected'
              "
            />
          </label>
        </li>
      </dsp-grid>
    </dsp-query-loader>
  </dsp-filter-bar-item>
</template>

<style lang="scss" scoped>
.item-filters-color {
  padding: var(--spacing-sm);

  li label {
    width: 100%;
    cursor: pointer;

    .item-filter-color--selected {
      border: solid 2px var(--color-brand-500);
    }
  }
}
</style>
