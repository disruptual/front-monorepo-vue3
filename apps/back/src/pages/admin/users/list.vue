<script>
export default { name: 'AdminUsersListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useUserApi } from '@dsp/core';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

useBreadCrumbs('Utilisateurs');
const { push } = useRouter();

const filters = ref({});
const query = useUserApi().findAllQuery({ filters });

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const onSoftDelete = users => {
  console.log(users);
};

const onMute = users => {
  console.log(users);
};

const goToDetail = row => {
  push({ name: 'AdminUserDetails', params: { slug: row.slug } });
};
</script>

<template>
  <DataTable
    id="users-list"
    :query="query"
    :min-row-size="48"
    @row-dbl-click="goToDetail"
    @filter-change="onFilterChange"
  >
    <DataTableColumn
      v-slot="{ row }"
      name="avatar"
      label="avatar"
      width="50"
      is-pinned
    >
      <dsp-avatar :user="row" />
    </DataTableColumn>
    <DataTableColumn name="slug" label="Slug" is-filterable is-highlightable />
    <DataTableColumn
      name="firstName"
      label="Prénom"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      name="lastName"
      label="Nom"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      name="email"
      label="Adresse E-mail"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date d'inscription"
      :tooltip-label="({ row }) => row.formatCreated()"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      is-highlightable
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.formatCreated('EEEE d MMMM yyyy') }}
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableRowAction
      name="mute"
      label="Anonymiser"
      :can-batch="false"
      icon="userSlash"
      @action="onMute"
    />

    <DataTableRowAction
      name="block"
      label="Bloquer"
      icon="userDelete"
      @action="onSoftDelete"
    />
  </DataTable>
</template>
