<script>
export default { name: 'AdminEmailListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEmailApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

const { t } = useI18n();

useBreadCrumbs('Emails');

const filters = ref({});
const query = useEmailApi().findAllQuery({
  relations: [],
  requestOptions: {
    params: { display: 'all' }
  }
});

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};
</script>

<template>
  <DataTable
    id="email-list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
    :row-detail-target="
      row => ({ name: 'AdminEmailDetails', params: { id: row.id } })
    "
    @filter-change="onFilterChange"
  >
    <template #no-result>
      <dsp-center>Il n'y a aucun Email</dsp-center>
    </template>

    <DataTableColumn
      name="id"
      :label="t('dataTable.label.id')"
      width="100"
      is-filterable
    />
    <DataTableColumn
      name="idTech"
      :label="t('dataTable.label.identifier')"
      width="400"
      is-highlightable
    />
    <DataTableColumn
      name="name"
      :label="t('dataTable.label.name')"
      width="200"
      is-filterable
    />
  </DataTable>
</template>
