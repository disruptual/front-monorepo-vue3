<script>
export default { name: 'AdminUsersListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useUserApi } from '@dsp/core';
import { useToast } from '@dsp/ui';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

useBreadCrumbs('Utilisateurs');
const { push } = useRouter();
const { showSuccess, showError } = useToast();
const { t } = useI18n();

const filters = ref({});
const { findAllQuery, muteMutation, unmuteMutation } = useUserApi();
const query = findAllQuery({ filters });
const { mutateAsync: mute } = muteMutation();
const { mutateAsync: unmute } = unmuteMutation();

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const onSoftDelete = users => {
  console.log(users);
};

const onMute = async users => {
  try {
    await Promise.all(
      users.map(user =>
        user.silentModeActivatedAt ? unmute(user.id) : mute(user.id)
      )
    );
    showSuccess(t('toasts.user.muteSuccess'));
    query.refetch.value();
  } catch (err) {
    console.error(err);
  }
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
    <DataTableColumn
      v-slot="{ row }"
      name="silentModeActivatedAt"
      label="Mode silencieux"
      is-hidden
      :tooltip-label="({ row }) => !!row.silentModeActivatedAt"
      :type="DATATABLE_COLUMN_TYPES.BOOLEAN"
      is-highlightable
      :highlight-options="{ predicate: row => !!row.silentModeActivatedAt }"
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.silentModeActivatedAt ? t('yes') : t('no') }}
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableRowAction
      name="mute"
      label="Bloquer"
      icon="userSlash"
      @action="onMute"
    />

    <DataTableRowAction
      name="block"
      label="Anonymisze"
      icon="userDelete"
      :can-batch="false"
      @action="onSoftDelete"
    />
  </DataTable>
</template>
