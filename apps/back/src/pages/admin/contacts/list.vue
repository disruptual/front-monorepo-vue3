<script>
export default { name: 'AdminContactListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useContactApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

const { t } = useI18n();

useBreadCrumbs('Contacts');

const filters = ref({});
const query = useContactApi().findAllQuery({ filters });
</script>

<template>
  <DataTable
    id="contact-list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
    :row-detail-target="
      row => ({ name: 'AdminContactDetails', params: { id: row.id } })
    "
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
