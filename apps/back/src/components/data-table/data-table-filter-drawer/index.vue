<script>
export default { name: 'DataTableFilterDrawer' };
</script>

<script setup>
import { inject, ref } from 'vue';
import { CONTEXT_KEYS, DATATABLE_COLUMN_TYPES } from '@/utils/constants';
import { useDevice } from '@dsp/ui';
import { useI18n } from 'vue-i18n';
import { noop } from '@dsp/core';

const { model } = inject(CONTEXT_KEYS.DATATABLE);

const isOpened = ref(false);
const { t } = useI18n();
const device = useDevice();

const formOptions = {
  onSubmit(values) {
    model.filters = values;
    isOpened.value = false;
  },
  unWrapValues: false
};

const getInitialValue = column => {
  const value = model.filters[column.filterName || column.name];
  if (value) return value;
  if (column.type === DATATABLE_COLUMN_TYPES.DATE) {
    return { before: null, after: null };
  }

  return null;
};
</script>

<template>
  <dsp-plain-button is-outlined left-icon="filter" @click="isOpened = true">
    <span v-if="device.isDesktop">Filtres</span>
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
        :initial-value="getInitialValue(column)"
      >
        <dsp-form-control
          v-slot="{ on, formControlProps, id }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          :label="column.label"
        >
          <div v-if="column.type === DATATABLE_COLUMN_TYPES.DATE">
            <div>
              <label class="label-date-picker" for="before">
                {{ t('dataTable.label.dateFrom') }}
              </label>
              <dsp-date-picker
                v-model="slotProps.field.value.after"
                name="before"
                v-bind="formControlProps"
                is-teleport
                v-on="{ ...on, 'update:modelValue': noop }"
              />
            </div>
            <div>
              <label class="label-date-picker" for="after">
                {{ t('dataTable.label.dateTo') }}
              </label>
              <dsp-date-picker
                v-model="slotProps.field.value.before"
                name="after"
                v-bind="formControlProps"
                is-teleport
                v-on="{ ...on, 'update:modelValue': noop }"
              />
            </div>
          </div>

          <dsp-select
            v-else-if="column.type === DATATABLE_COLUMN_TYPES.ENUM"
            v-model="slotProps.field.value"
            v-bind="formControlProps"
            v-on="on"
          >
            <option
              v-for="(option, index) in column.enumValues"
              :key="index"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </dsp-select>

          <dsp-checkbox
            v-else-if="column.type === DATATABLE_COLUMN_TYPES.BOOLEAN"
            v-bind="formControlProps"
            :id="id"
            v-model="slotProps.field.value"
            v-on="on"
          />

          <dsp-input-text
            v-else
            v-model="slotProps.field.value"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-smart-form-field
        v-for="filter in model.customFilters"
        v-slot="slotProps"
        :key="filter.name"
        :name="filter.name"
        :initial-value="getInitialValue(filter)"
      >
        <dsp-form-control
          v-slot="formControlProps"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          :label="filter.label"
        >
          <dsp-v-node :vnode="filter.template" v-bind="formControlProps" />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-smart-form-submit is-full-width>Appliquer</dsp-smart-form-submit>
    </dsp-smart-form>
  </dsp-drawer>
</template>

<style lang="scss" scoped>
.data-table-filter-drawer {
  padding: var(--spacing-md) var(--spacing-lg);
}
</style>
