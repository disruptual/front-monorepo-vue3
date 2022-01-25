<script>
export default { name: 'AdminVoucher' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useVoucherApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

useBreadCrumbs("Bon d'achats");

const { push } = useRouter();
const { t } = useI18n();
const filters = ref({});
const query = useVoucherApi().findAllQuery({
  filters,
  requestOptions: { params: { display: 'all' } }
});

const { mutateAsync: updateVoucher } = useVoucherApi().updateMutation();

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const updateVisiblity = async voucher => {
  await updateVoucher({ id: voucher.id, dto: { enabled: !voucher.enabled } });
  query.refetch.value();
};

console.log(query.data);

const onSoftDelete = vouchers => {
  console.log(vouchers);
};

const goToDetail = row => {
  push({ name: 'AdminUserDetails', params: { slug: row.slug } });
};
</script>

<template>
  <DataTable
    id="voucher_list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
    @row-dbl-click="goToDetail"
    @filter-change="onFilterChange"
  >
    <template #no-result>
      <dsp-center>Cet utilisateur n'a réalisé aucune commande.</dsp-center>
    </template>

    <DataTableColumn
      name="id"
      :label="t('dataTable.label.id')"
      width="100"
      is-filterable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="createdAt"
      :label="t('dataTable.label.created')"
      width="200"
      :tooltip-label="({ row }) => row.formatCreatedAt()"
    >
      {{ row.formatCreatedAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="createdAt"
      :label="t('dataTable.label.dateValidated')"
      width="200"
      :tooltip-label="({ row }) => row.formatValidatedAt()"
    >
      {{ row.formatValidatedAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="user.email"
      :label="t('dataTable.label.email')"
      width="100"
      is-filterable
    >
      <dsp-truncated-text>
        <router-link
          v-if="row.user"
          :to="{ name: 'AdminUserDetails', params: { slug: row.user?.slug } }"
        >
          {{ row.user?.email }}
        </router-link>
      </dsp-truncated-text>
    </DataTableColumn>
    <DataTableColumn
      name="amount"
      :label="t('dataTable.label.amount')"
      width="100"
      is-filterable
    />
    <DataTableColumn
      name="platformRate"
      :label="t('dataTable.label.plateformRate')"
      width="100"
      is-filterable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="generated"
      :label="t('dataTable.label.generated')"
      width="100"
      is-filterable
    >
      <dsp-checkbox
        label=""
        :model-value="row.generated"
        readonly
        @click.prevent
      />
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="generated"
      :label="t('dataTable.label.visibility')"
      width="200"
    >
      <dsp-center>
        <dsp-checkbox
          :label="t('dataTable.label.visibility')"
          :model-value="row.generated"
          @change="updateVisiblity(row)"
        />
      </dsp-center>
    </DataTableColumn>
    <DataTableRowAction
      name="block"
      :label="t('dataTable.label.edit')"
      icon="userDelete"
      @action="onSoftDelete"
    />
  </DataTable>
</template>
