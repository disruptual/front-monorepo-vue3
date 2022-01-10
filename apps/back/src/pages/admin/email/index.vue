<script>
export default { name: 'AdminEmailListPage' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useEmailApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

const { t } = useI18n();
const { push } = useRouter();
const route = useRoute();

useBreadCrumbs('Emails');

const filters = ref({});
const query = useEmailApi().findAllQuery({ filters });

console.log('query EMAIL ==> ', query);

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const onSoftDelete = orders => {
  console.log(orders);
};

const goToEdit = row => {
  push({ name: 'AdminEmailDetails', params: { id: row.id } });
};
</script>

<template>
  <DataTable
    id="email-list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
    @row-dbl-click="goToEdit"
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
      is-filterable
    />
    <DataTableColumn
      name="name"
      :label="t('dataTable.label.name')"
      width="200"
      is-filterable
    />
    <DataTableRowAction
      name="block"
      :label="t('dataTable.label.delete')"
      icon="userDelete"
      @action="onSoftDelete"
    />
  </DataTable>
</template>
setDatePicker
