<script>
export default { name: 'AdminContactListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useContactApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { CONTACT_STATUSES } from '@dsp/business';
import {
  CONTACT_STATUS_COLORS,
  DATATABLE_COLUMN_TYPES
} from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

const { t } = useI18n();
const { resolve } = useRouter();

useBreadCrumbs('Contacts');

const defaultFilters = {
  'root[exists]': 'false',
  'sort[created]': 'desc'
};

const filters = ref({ ...defaultFilters });
const onFilterChange = ({ created, status, ...newFilters }) => {
  filters.value = {
    ...defaultFilters,
    ...newFilters,
    status: status ? [status] : null,
    'created[before]': created?.before,
    'created[after]': created?.after
  };
};

const query = useContactApi().findAllQuery({ filters });

const contactStatuses = Object.values(CONTACT_STATUSES).map(status => ({
  value: status,
  label: t(`contact.status.${status}`)
}));

const onOpenNewTab = row => {
  const routeData = resolve({
    name: 'AdminContactDetails',
    params: { id: row[0].id }
  });
  window.open(routeData.href, '_blank');
};
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
    @filter-change="onFilterChange"
  >
    <template #no-result>
      <dsp-center>Il n'y a aucune demande de contact</dsp-center>
    </template>

    <DataTableColumn
      v-slot="{ row }"
      name="status"
      :label="t('dataTable.label.status')"
      width="125"
      :type="DATATABLE_COLUMN_TYPES.ENUM"
      :enum-values="contactStatuses"
      is-filterable
    >
      <div
        class="status"
        :style="{ '--color': CONTACT_STATUS_COLORS[row.status] }"
      >
        {{ t(`contact.status.${row.status}`) }}
      </div>
    </DataTableColumn>
    <DataTableColumn name="id" :label="t('dataTable.label.id')" width="100" />
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      :label="t('dataTable.label.created')"
      width="100"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      :tooltip-label="({ row }) => row.formatCreated()"
      is-filterable
      is-highlightable
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn
      name="firstName"
      :label="t('dataTable.label.firstname')"
      width="150"
      is-highlightable
    />
    <DataTableColumn
      name="lastName"
      :label="t('dataTable.label.lastname')"
      width="150"
      is-highlightable
    />
    <DataTableColumn
      name="email"
      :label="t('dataTable.label.email')"
      width="200"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      name="content"
      :label="t('dataTable.label.content')"
      width="200"
    />
  </DataTable>
</template>

<style scoped>
.status {
  color: var(--color);
}
</style>
