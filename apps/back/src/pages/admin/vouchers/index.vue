<script>
export default { name: 'AdminVoucher' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useVoucherApi } from '@dsp/core';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

useBreadCrumbs("Bon d'achats");
const { push } = useRouter();

const filters = ref({});
const query = useVoucherApi().findAllQuery({ filters });
const { mutateAsync: updateVoucher } = useVoucherApi().updateMutation();

const updateVisiblity = async voucher => {
  await updateVoucher({ id: voucher.id, dto: { enabled: !voucher.enabled } });
  query.refetch.value();
};

console.log('Query voucher ==> ', query);

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const onSoftDelete = vouchers => {
  console.log(vouchers);
};

const goToDetail = row => {
  push({ name: 'AdminUserDetails', params: { slug: row.slug } });
};

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();
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
      :tooltip-label="({ row }) => row.formatCreated()"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>
    <DataTableColumn
      name="email"
      :label="t('dataTable.label.email')"
      width="100"
      is-filterable
    />
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