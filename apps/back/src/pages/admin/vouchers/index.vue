<script>
export default { name: 'AdminVoucher' };
</script>

<script setup>
import { ref } from 'vue';
import { useVoucherApi } from '@dsp/core';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

useBreadCrumbs("Bon d'achats");

const filters = ref({});
const query = useVoucherApi().findAllQuery({ filters });
const { mutateAsync: updateVoucher } = useVoucherApi().updateMutation();

const updateVisiblity = async voucher => {
  await updateVoucher({ id: voucher.id, dto: { enabled: !voucher.enabled } });
  query.refetch.value();
};

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};
</script>

<template>
  <DataTable
    id="voucher_list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
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
  </DataTable>
</template>
