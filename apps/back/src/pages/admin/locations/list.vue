<script>
export default { name: 'AdminLocation' };
</script>

<script setup>
import { ref, computed } from 'vue';

import { useI18n } from 'vue-i18n';
import { useLocationApi } from '@dsp/core';
import { useForm } from '@dsp/ui';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

const { t } = useI18n();

useBreadCrumbs('Magasins');
const filters = ref({});
const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};
const query = useLocationApi().findAllQuery({
  filters,
  requestOptions: {
    params: { display: 'all' }
  }
});

const { mutateAsync: updateLocation, isLoading: isUpdating } =
  useLocationApi().updateMutation({
    onSuccess() {
      query.refetch.value({ cancelRefetch: true });
    }
  });

const updatedRowId = ref(null);
const updateVisiblity = location => {
  updatedRowId.value = location.id;

  return updateLocation({
    id: location.id,
    entity: { enabled: !location.enabled }
  });
};

const selectedLocation = ref(null);
const isModalOpened = computed(() => selectedLocation.value !== null);

const form = useForm({
  async onSubmit(values) {
    await updateLocation({ id: selectedLocation.value.id, entity: values });
    selectedLocation.value = null;
  }
});
const [, formOptions] = form;
const minDate = new Date();
const minReopensAt = computed(
  () => formOptions.values.value.closesAt || minDate
);
const maxClosesAt = computed(() => formOptions.values.value.reopensAt);
</script>

<template>
  <DataTable
    id="locations-list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
    :row-detail-target="
      row => ({ name: 'AdminLocationDetails', params: { id: row.id } })
    "
    @filter-change="onFilterChange"
  >
    <template #no-result>
      <dsp-center>Ce projet n'a aucun magasin.</dsp-center>
    </template>

    <DataTableColumn
      name="storeCode"
      :label="t('dataTable.label.storeCode')"
      width="100"
    />
    <DataTableColumn
      name="name"
      :label="t('dataTable.label.name')"
      width="200"
      is-highlightable
      is-filterable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="open"
      :label="t('dataTable.label.state')"
      width="200"
    >
      <dsp-center>
        <dsp-button
          :color-scheme="row.open ? 'success' : 'error'"
          @click="selectedLocation = row"
        >
          {{ row.open ? 'Ouvert' : 'Fermé' }}
        </dsp-button>
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="enabled"
      :label="t('dataTable.label.visibility')"
      :tooltip-label="
        ({ row }) =>
          row.enabled ? t('location.enabled') : t('location.disabled')
      "
      width="150"
    >
      <dsp-center class="visibility-wrapper">
        <dsp-switch
          :model-value="row.enabled"
          :disabled="isUpdating && updatedRowId === row.id"
          @update:modelValue="updateVisiblity(row)"
        />
      </dsp-center>
    </DataTableColumn>
  </DataTable>

  <dsp-modal
    :focus-inside-on-open="false"
    :is-opened="isModalOpened"
    @close="selectedLocation = null"
  >
    <dsp-section>
      <dsp-center>
        <dsp-section-heading>Editer les dates de fermeture</dsp-section-heading>
      </dsp-center>
    </dsp-section>
    <dsp-smart-form :form="form">
      <dsp-smart-form-field
        v-slot="slotProps"
        name="closesAt"
        :initial-value="null"
        required
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Date de début de fermeture"
        >
          <dsp-date-picker
            id="location-form-start"
            v-model="slotProps.field.value"
            v-bind="formControlProps"
            :min="minDate"
            :max="maxClosesAt"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-smart-form-field
        v-slot="slotProps"
        name="reopensAt"
        :initial-value="null"
        required
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Date de fin de fermeture"
        >
          <dsp-date-picker
            id="location-form-end"
            v-model="slotProps.field.value"
            v-bind="formControlProps"
            :min="minReopensAt"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-flex justify="flex-end" gap="md">
        <dsp-button is-outlined type="button" @click="selectedLocation = null">
          {{ t('cancel') }}
        </dsp-button>

        <dsp-smart-form-submit>
          {{ t('validate') }}
        </dsp-smart-form-submit>
      </dsp-flex>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style scoped>
.visibility-wrapper {
  flex: 1;
}
</style>
