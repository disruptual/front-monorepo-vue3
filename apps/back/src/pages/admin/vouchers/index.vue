<script>
export default { name: 'AdminVoucher' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVoucherApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

useBreadCrumbs("Bon d'achats");

const { t } = useI18n();
const filters = ref({});
const onFilterChange = ({ created, ...newFilters }) => {
  filters.value = {
    ...newFilters,
    'created[before]': created?.before,
    'created[after]': created?.after
  };
};

const { findAllQuery, updateMutation } = useVoucherApi();
const query = findAllQuery({
  filters,
  requestOptions: { params: { display: 'all' } }
});

const { mutate: updateVoucher } = updateMutation();

const onCheckboxChange = (id, generated) => {
  updateVoucher({ id, entity: { generated } });
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

    <DataTableColumn name="id" :label="t('dataTable.label.id')" width="50" />
    <DataTableColumn
      v-slot="{ row }"
      name="createdAt"
      :label="t('dataTable.label.created')"
      width="200"
      is-filterable
      :tooltip-label="({ row }) => row.formatCreatedAt()"
    >
      {{ row.formatCreatedAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="validatedAt"
      :label="t('dataTable.label.expirationDate')"
      width="200"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      :tooltip-label="({ row }) => row.formatValidatedAt()"
    >
      {{ row.formatValidatedAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="user.email"
      :label="t('dataTable.label.email')"
      width="200"
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
      name="formatedAmount"
      :label="t('dataTable.label.amount')"
      width="100"
      :type="DATATABLE_COLUMN_TYPES.NUMBER"
      is-highlightable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="code"
      :label="t('dataTable.label.code')"
      is-highlightable
    >
      {{ row.code || row.enum }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="generated"
      :label="t('dataTable.label.generated')"
      width="100"
    >
      <dsp-center class="dsp-center">
        <dsp-checkbox
          label=""
          :model-value="row.generated"
          readonly
          @update:modelValue="onCheckboxChange(row.id, $event)"
        />
      </dsp-center>
    </DataTableColumn>
  </DataTable>
</template>

<style scoped>
.dsp-center {
  width: 100%;
}

a {
  color: inherit;
}
</style>
