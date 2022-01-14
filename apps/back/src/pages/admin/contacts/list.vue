<script>
export default { name: 'AdminContactListPage' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useContactApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

const { t } = useI18n();
const { push } = useRouter();
const route = useRoute();

useBreadCrumbs('Contacts');

const filters = ref({});
const query = useContactApi().findAllQuery({ filters });

console.log('query CONTACT ==> ', query);

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const onSoftDelete = orders => {
  console.log(orders);
};

const goToDetail = row => {
  push({ name: 'AdminContactDetails', params: { id: row.id } });
};
</script>

<template>
  <DataTable
    id="contact-list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
    @row-dbl-click="goToDetail"
  >
    <template #no-result>
      <dsp-center>Il n'y a aucune demande de contact</dsp-center>
    </template>

    <DataTableColumn
      name="id"
      :label="t('dataTable.label.id')"
      width="100"
      is-filterable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      :label="t('dataTable.label.created')"
      width="100"
      :tooltip-label="({ row }) => row.formatCreated()"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>
    <DataTableColumn
      name="service"
      :label="t('dataTable.label.service')"
      width="100"
      is-filterable
    />
    <DataTableColumn
      name="firstName"
      :label="t('dataTable.label.firstname')"
      width="150"
      is-filterable
    />
    <DataTableColumn
      name="lastName"
      :label="t('dataTable.label.lastname')"
      width="150"
      is-filterable
    />
    <DataTableColumn
      name="email"
      :label="t('dataTable.label.email')"
      width="200"
      is-filterable
    />
    <DataTableColumn
      name="content"
      :label="t('dataTable.label.content')"
      width="200"
      is-filterable
    />
  </DataTable>
</template>
