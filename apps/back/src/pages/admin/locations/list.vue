<script>
export default { name: 'AdminLocation' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

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

const { mutateAsync: updateStore } = useLocationApi().updateMutation();

const updateVisiblity = async store => {
  await updateStore({ id: store.id, dto: { enabled: !store.enabled } });
  query.refetch.value();
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
          :class="[row.open ? 'store-open' : 'store-closed']"
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
      width="200"
    >
      <dsp-center>
        <dsp-checkbox
          label="visibilité"
          :model-value="row.enabled"
          @change="updateVisiblity(row)"
        />
      </dsp-center>
    </DataTableColumn>
  </DataTable>
</template>

<style lang="scss">
.dsp-button.store-open {
  background-color: var(--color-success-400);
  &:hover {
    background-color: var(--color-success-600);
  }
}

.dsp-button.store-closed {
  background-color: var(--color-error-500);
  &:hover {
    background-color: var(--color-error-600);
  }
}
</style>
