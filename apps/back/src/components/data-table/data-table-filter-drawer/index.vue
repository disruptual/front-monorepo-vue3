<script>
export default { name: 'DataTableFilterDrawer' };
</script>

<script setup>
import { inject, ref } from 'vue';
import { CONTEXT_KEYS } from '@/utils/constants';

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const isOpened = ref(false);

const formOptions = {
  onSubmit(values) {
    model.filters = values;
    isOpened.value = false;
  }
};
</script>

<template>
  <dsp-button
    color-scheme="success"
    left-icon="filter"
    @click="isOpened = true"
  >
    Filtres
  </dsp-button>

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
