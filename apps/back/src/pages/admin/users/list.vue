<script>
export default { name: 'AdminUsersListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useUserApi } from '@dsp/core';
import { useToast } from '@dsp/ui';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import DataTableCustomFilter from '@/components/data-table/data-table-custom-filter/index.vue';

useBreadCrumbs('Utilisateurs');
const { showSuccess, showError } = useToast();
const { t } = useI18n();

const filters = ref({});
const isReady = ref(false);
const {
  findAllQuery,
  muteMutation,
  unmuteMutation,
  anonymizeMutation,
  blockedMutation,
  unblockedMutation
} = useUserApi();
const query = findAllQuery({ filters, enabled: isReady });

const { mutateAsync: mute } = muteMutation();
const { mutateAsync: unmute } = unmuteMutation();
const { mutateAsync: block } = blockedMutation();
const { mutateAsync: unblock } = unblockedMutation();
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

const onFilterChange = ({ transactionWithdraw, created, ...newFilters }) => {
  filters.value = {
    ...newFilters,
    'created[before]': created?.before,
    'created[after]': created?.after,
    'transactionWithdrawBlockedAt[]': transactionWithdraw,
    'sort[created]': 'desc'
  };
  isReady.value = true;
};

const anonymizedUser = ref(null);
const isAnonymizeModalOpened = ref(false);
const onAnonymize = ([user]) => {
  anonymizedUser.value = user;
  isAnonymizeModalOpened.value = true;
};

const onBlock = async ([user]) => {
  try {
    user.blockedAt ? await unblock(user.id) : await block(user.id);
    user.blockedAt
      ? showSuccess(t('toasts.user.unblockSuccess'))
      : showSuccess(t('toasts.user.blockSuccess'));
    query.refetch.value();
  } catch (err) {
    showError(t('toasts.user.blockError'));
    console.error(err);
  }
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
    :min-row-size="58"
    :row-detail-target="
      row => ({ name: 'AdminUserDetails', params: { slug: row.slug } })
    "
    @filter-change="onFilterChange"
  >
    <DataTableCustomFilter
      v-slot="{ on, ...slotProps }"
      name="transactionWithdraw"
      label="Suspecté de fraude"
    >
      <dsp-checkbox v-bind="slotProps" v-on="on" />
    </DataTableCustomFilter>

    <DataTableColumn
      v-slot="{ row }"
      name="avatar"
      width="100"
      :label="t('dataTable.label.avatar')"
      is-pinned
    >
      <dsp-center style="flex: 1"><dsp-avatar :user="row" /></dsp-center>
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
      name="username"
      :label="t('dataTable.label.username')"
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
      is-filterable
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.formatCreated("dd-MM-yy à kk'h'mm") }}
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="updated"
      :label="t('dataTable.label.updated')"
      :tooltip-label="({ row }) => row.formatUpdated()"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      is-highlightable
      is-hidden
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.formatUpdated("dd-MM-yy à kk'h'mm") }}
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="silentModeActivatedAt"
      :label="t('dataTable.label.modeSilenceAction')"
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

    <DataTableColumn
      v-slot="{ row }"
      name="AnonymizedModeActivatedAt"
      :label="t('dataTable.label.modeAnonymizedAction')"
      is-hidden
      :tooltip-label="({ row }) => !!row.anonymize"
      :type="DATATABLE_COLUMN_TYPES.BOOLEAN"
      is-highlightable
      :highlight-options="{ predicate: row => !!row.anonymize }"
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.anonymize ? t('yes') : t('no') }}
      </dsp-truncated-text>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="blockedModeActivated"
      :label="t('dataTable.label.modeBlockedAction')"
      is-hidden
      :tooltip-label="({ row }) => !!row.blocked"
      :type="DATATABLE_COLUMN_TYPES.BOOLEAN"
      is-highlightable
      :highlight-options="{ predicate: row => !!row.blocked }"
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.blocked ? t('yes') : t('no') }}
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableRowAction
      name="mute"
      :label="t('dataTable.label.modeSilence')"
      icon="userSlash"
      @action="onMute"
    />

    <DataTableRowAction
      name="anonymize"
      :label="t('dataTable.label.anonymize')"
      icon="userDelete"
      :can-batch="false"
      @action="onAnonymize"
    />

    <DataTableRowAction
      name="block"
      :label="t('dataTable.label.blocked')"
      icon="ban"
      :can-batch="false"
      @action="onBlock"
    />
  </DataTable>
</template>
