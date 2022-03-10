<script>
export default { name: 'UserOrders' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useOrderApi, oneOf } from '@dsp/core';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

const props = defineProps({
  userId: { type: String, required: true },
  queryType: oneOf(['sales', 'purchases'])
});

const { t } = useI18n();

const queryParameters = [
  props.userId,
  {
    relations: ['buyer', 'seller']
  }
];
const { findAllByUserIdQuery, findAllSalesByUserIdQuery } = useOrderApi();
const operation =
  props.queryType === 'purchases'
    ? findAllByUserIdQuery
    : findAllSalesByUserIdQuery;

const query = operation(...queryParameters);
</script>

<template>
  <DataTable
    id="user-items"
    :query="query"
    :min-row-size="40"
    :has-action-bar="false"
    :has-selector-column="false"
    :row-detail-target="
      row => ({ name: 'AdminOrderDetails', params: { id: row.id } })
    "
  >
    <template #no-result>
      <dsp-center>Cet utilisateur n'a réalisé aucune commande.</dsp-center>
    </template>

    <DataTableColumn name="id" :label="t('dataTable.label.id')" width="100" />

    <DataTableColumn
      v-slot="{ row }"
      name="created"
      :label="t('dataTable.label.created')"
      :tooltip-label="({ row }) => row.formatCreated()"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="seller"
      :label="t('dataTable.label.seller')"
    >
      <router-link
        v-if="row.seller"
        :to="{ name: 'AdminUserDetails', params: { slug: row.seller?.slug } }"
      >
        {{ row.seller?.email }}
      </router-link>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="buyer"
      :label="t('dataTable.label.buyer')"
    >
      <router-link
        v-if="row.buyer"
        :to="{ name: 'AdminUserDetails', params: { slug: row.buyer?.slug } }"
      >
        {{ row.buyer?.email }}
      </router-link>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="itemCount"
      :label="t('dataTable.label.numbArticles')"
      width="80"
    >
      {{ row._orderItems?.length }}
    </DataTableColumn>
  </DataTable>
</template>

<style lang="scss" scoped>
a {
  color: inherit;
}
</style>
