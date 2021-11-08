<script>
export default { name: 'AdminOrdersListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useOrderApi } from '@dsp/core';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import { filter } from 'lodash-es';

useBreadCrumbs('Commandes');
const { push } = useRouter();

const filters = ref({});
const query = useOrderApi().findAllQuery({
  filters,
  relations: ['seller', 'buyer', 'orderItems']
});

const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const onSoftDelete = orders => {
  console.log(orders);
};

const goToDetail = row => {
  push({ name: 'AdminOrdersDetails', params: { id: row.id } });
};
</script>

<template>
  <DataTable
    id="orders-list"
    :query="query"
    :min-row-size="40"
    @row-dbl-click="goToDetail"
  >
    <DataTableColumn name="id" label="Id" width="100" />
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date de création"
      width="200"
      :tooltip-label="({ row }) => row.formatCreated()"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>
    <DataTableColumn v-slot="{ row }" name="seller" label="Vendeur" width="200">
      <router-link
        v-if="row.seller"
        :to="{ name: 'AdminUserDetails', params: { slug: row.seller?.slug } }"
      >
        {{ row.seller?.email }}
      </router-link>
    </DataTableColumn>
    <DataTableColumn v-slot="{ row }" name="buyer" label="Acheteur" width="200">
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
      label="Nb d'articles"
      width="80"
    >
      {{ row.orderItems.length }}
    </DataTableColumn>
    <DataTableColumn name="moneyBox" label="Montant" width="150" />
    <DataTableColumn name="orderState" label="Statut" width="300" />
  </DataTable>
</template>
