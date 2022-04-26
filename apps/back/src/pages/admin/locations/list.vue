<script>
export default { name: 'AdminLocation' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash-es';

import { useI18n } from 'vue-i18n';
import { useLocationApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

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

const setDatePicker = () => {};

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
          @click="setDatePicker"
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
</template>

<style scoped>
.visibility-wrapper {
  flex: 1;
}
</style>
