<script>
export default { name: 'DataTableFilterDrawer' };
</script>

<script setup>
import { inject, ref } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';
import { vTooltip } from '@dsp/ui';

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const isOpened = ref(false);

const formOptions = {
  onSubmit(values) {
    console.log(values);
    model.filters = values;
    isOpened.value = false;
  }
};
</script>

<template>
  <dsp-plain-button is-outlined left-icon="filter" @click="isOpened = true">
    <span v-tooltip="'Filtres'">
      <dsp-icon icon="filter" />
    </span>
  </dsp-plain-button>
  <dsp-drawer :is-opened="isOpened" position="right" @close="isOpened = false">
    <dsp-smart-form
      :form-options="formOptions"
      class="data-table-filter-drawer"
    >
      <dsp-smart-form-field
        v-for="column in model.filterableColumns"
        v-slot="slotProps"
        :key="column.name"
        :name="column.filterName || column.name"
        :initial-value="model.filters[column.filerName || column.name]"
      >
        <dsp-form-control
          v-model="slotProps.field.value"
          v-bind="slotProps"
          :label="column.label"
        />
      </dsp-smart-form-field>

      <dsp-smart-form-submit is-full-width>Appliquer</dsp-smart-form-submit>
    </dsp-smart-form>
  </dsp-drawer>
</template>

<style lang="scss" scoped>
.data-table-filter-drawer {
  padding: var(--spacing-md);
}
</style>
