<script>
export default { name: 'AdminOrdersListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useOrderApi } from '@dsp/core';
import { ORDER_STATE_TRANSITIONS } from '@dsp/business';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

useBreadCrumbs('Commandes');
const { push } = useRouter();
const { t } = useI18n();

const filters = ref({});
const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};

const query = useOrderApi().findAllQuery({
  filters,
  relations: ['seller', 'buyer', 'orderItems', 'delivery']
});

const goToDetail = row => {
  push({ name: 'AdminOrderDetails', params: { id: row.id } });
};

const statusHighlightOptions = {
  values: Object.values(ORDER_STATE_TRANSITIONS).map(state => ({
    value: state,
    label: t(`order.status.${state}`)
  }))
};
const itemCountHighlightOptions = {
  predicate: row => row?.orderItems?.length
};

const getStatusClass = order => ({
  'order-status--cancelled': order.isCancelled,
  'order-status--finished': order.isFinished
});
</script>

<template>
  <DataTable
    id="orders-list"
    :query="query"
    :min-row-size="40"
    @row-dbl-click="goToDetail"
    @filter-change="onFilterChange"
  >
    <DataTableColumn name="id" label="Id" width="100" is-filterable />
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date de création"
      width="200"
      :tooltip-label="({ row }) => row.formatCreated()"
      is-highlightable
    >
      {{ row.formatCreated() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="status"
      label="Statut"
      width="250"
      :type="DATATABLE_COLUMN_TYPES.ENUM"
      :highlight-options="statusHighlightOptions"
      is-highlightable
    >
      <span class="order-status" :class="getStatusClass(row)">
        {{ t(`order.status.${row.status}`) }}
      </span>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="seller"
      label="Vendeur"
      width="200"
      is-filterable
      filter-name="orderSeller.user.email"
      is-highlightable
    >
      <router-link
        v-if="row.seller"
        :to="{ name: 'AdminUserDetails', params: { slug: row.seller?.slug } }"
      >
        <dsp-truncated-text>
          {{ row.seller?.email }}
        </dsp-truncated-text>
      </router-link>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="buyer"
      label="Acheteur"
      width="200"
      is-filterable
      filter-name="orderUser.email"
      is-highlightable
    >
      <router-link
        v-if="row.buyer"
        :to="{ name: 'AdminUserDetails', params: { slug: row.buyer?.slug } }"
      >
        <dsp-truncated-text>{{ row.buyer?.email }}</dsp-truncated-text>
      </router-link>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="itemCount"
      label="Nb d'articles"
      width="80"
      :type="DATATABLE_COLUMN_TYPES.NUMBER"
      :highlight-options="itemCountHighlightOptions"
      is-highlightable
    >
      {{ row.orderItems?.length }}
    </DataTableColumn>
    <DataTableColumn
      name="formatedPrice"
      label="Montant"
      width="150"
      :type="DATATABLE_COLUMN_TYPES.NUMBER"
      is-highlightable
    />
  </DataTable>
</template>

<style lang="scss" scoped>
a {
  color: inherit;
}

.order-status {
  font-weight: var(--font-weight-bold);
}
.order-status--cancelled {
  color: var(--color-red-500);
}

.order-status--finished {
  color: var(--color-green-600);
}
</style>
