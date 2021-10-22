<script>
export default { name: 'AdminUsersListPage' };
</script>

<script setup>
import { useRouter } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useUserApi } from '@dsp/core';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

useBreadCrumbs('Utilisateurs');
const { push } = useRouter();

const query = useUserApi().findAllQuery();

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
  <DataTable :query="query" :min-row-size="48" @row-dbl-click="goToDetail">
    <DataTableColumn
      v-slot="{ row }"
      name="avatar"
      label=" "
      width="50"
      is-pinned
    >
      <dsp-avatar :user="row" />
    </DataTableColumn>
    <DataTableColumn name="slug" label="Slug" width="500" />
    <DataTableColumn name="firstName" label="Prénom" width="600" />
    <DataTableColumn name="lastName" label="Nom" width="600" />
    <DataTableColumn name="email" label="Adress E-mail" width="650" />
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date d'inscription"
      :tooltip-label="({ row }) => row.formatCreated()"
      width="1000"
    >
      {{ row.formatCreated('EEEE d MMMM yyyy') }}
    </DataTableColumn>

    <DataTableRowAction
      name="mute"
      label="Anonymiser"
      :can-batch="false"
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
