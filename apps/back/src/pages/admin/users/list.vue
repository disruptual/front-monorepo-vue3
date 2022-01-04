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
const { findAllQuery, muteMutation, unmuteMutation, anonymizeMutation } =
  useUserApi();
const query = findAllQuery({ filters });
const { mutateAsync: mute } = muteMutation();
const { mutateAsync: unmute } = unmuteMutation();
const { mutate: anonymize, isLoading: isAnonymizing } = anonymizeMutation({
  onSuccess() {
    showSuccess(t('toasts.user.anonymizeSuccess'));
    isAnonymizeModalOpened.value = false;
    anonymizedUser.value = null;
  },

  onError(err) {
    console.error(err);
    showError(t('toasts.user.anonymizeError'));
  }
});

const onFilterChange = newFilters => {
  filters.value = newFilters;
};

const anonymizedUser = ref(null);
const isAnonymizeModalOpened = ref(false);
const onSoftDelete = ([user]) => {
  anonymizedUser.value = user;
  isAnonymizeModalOpened.value = true;
};

const onMute = async users => {
  try {
    await Promise.all(
      users.map(user =>
        user.silentModeActivatedAt ? unmute(user.id) : mute(user.id)
      )
    );
    showSuccess(t('toasts.user.muteSuccess'), users.length);
    query.refetch.value();
  } catch (err) {
    showError(t('toasts.user.muteError', users.length));
    console.error(err);
  }
};

const goToDetail = row => {
  push({ name: 'AdminUserDetails', params: { slug: row.slug } });
};
</script>

<template>
  <dsp-modal
    :is-opened="isAnonymizeModalOpened"
    @close="isAnonymizeModalOpened = false"
  >
    <h2>
      {{ t('user.anonymizeModal.title', { user: anonymizedUser.fullName }) }}
    </h2>
    <dsp-alert icon="warning" color-scheme="red">
      {{ t('user.anonymizeModal.alert') }}
    </dsp-alert>
    <dsp-flex justify="flex-end" gap="sm">
      <dsp-button is-outlined @click="isAnonymizeModalOpened = false">
        {{ t('cancel') }}
      </dsp-button>
      <dsp-loading-button
        :is-loading="isAnonymizing"
        @click="anonymize(anonymizedUser.id)"
      >
        {{ t('validate') }}
      </dsp-loading-button>
    </dsp-flex>
  </dsp-modal>
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
      :label="t('dataTable.label.avatar')"
      width="50"
      is-pinned
    >
      <dsp-avatar :user="row" />
    </DataTableColumn>
    <DataTableColumn
      name="slug"
      :label="t('dataTable.label.slug')"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      name="firstName"
      :label="t('dataTable.label.firstname')"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      name="lastName"
      :label="t('dataTable.label.lastname')"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      name="email"
      :label="t('dataTable.label.email')"
      is-filterable
      is-highlightable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      :label="t('dataTable.label.inscription')"
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
      :label="t('dataTable.label.modeSilence')"
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
      :label="t('dataTable.label.mute')"
      icon="userSlash"
      @action="onMute"
    />

    <DataTableRowAction
      name="block"
      :label="t('dataTable.label.anonymize')"
      icon="userDelete"
      :can-batch="false"
      @action="onSoftDelete"
    />
  </DataTable>
</template>
