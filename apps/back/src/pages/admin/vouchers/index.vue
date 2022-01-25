<script>
export default { name: 'AdminVoucher' };
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useVoucherApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

useBreadCrumbs("Bon d'achats");

const { push } = useRouter();
const { t } = useI18n();
const filters = ref({});
const query = useVoucherApi().findAllQuery({
  filters,
  requestOptions: { params: { display: 'all' } }
});

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
      <dsp-center class="dsp-center">
        <dsp-checkbox
          label=""
          :model-value="row.generated"
          readonly
          @click.prevent
        />
      </dsp-center>
    </DataTableColumn>
  </DataTable>
</template>

<style scoped>
.dsp-center {
  width: 100%;
}
</style>
