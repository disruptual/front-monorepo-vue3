<script>
export default { name: 'UserOrders' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useOrderApi, oneOf } from '@dsp/core';
import { ORDER_STATES } from '@dsp/business';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

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
    relations: ['buyer', 'seller', 'delivery']
  }
];
const { findAllByUserIdQuery, findAllSalesByUserIdQuery } = useOrderApi();
const operation =
  props.queryType === 'purchases'
    ? findAllByUserIdQuery
    : findAllSalesByUserIdQuery;

const query = operation(...queryParameters);

const statuses = Object.values(ORDER_STATES).map(state => ({
  value: state,
  label: t(`order.status.${state}`)
}));

const getStatusClass = order => ({
  'order-status--cancelled': order.isCancelled,
  'order-status--finished': order.isFinished
});
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
      name="orderState"
      :label="t('dataTable.label.status')"
      width="250"
      :type="DATATABLE_COLUMN_TYPES.ENUM"
      :enum-values="statuses"
      is-highlightable
      is-filterable
    >
      <dsp-truncated-text class="order-status" :class="getStatusClass(row)">
        {{ t(`order.status.${row.status}`) }}
      </dsp-truncated-text>
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

.order-status {
  font-weight: var(--font-weight-bold);
}

.order-status--cancelled {
  color: var(--color-red-500);
}

.order-status--finished {
  color: var(--color-green-700);
}
</style>
