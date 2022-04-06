<script>
export default { name: 'AdminOrdersListPage' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useOrderApi, useDeliveryApi } from '@dsp/core';
import { ORDER_STATES } from '@dsp/business';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';
import { ORDER_PROBLEM_STATES } from '@dsp/business';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

useBreadCrumbs('Commandes');

const { t } = useI18n();
const filters = ref({});

const onFilterChange = ({ created, ...newFilters }) => {
  filters.value = {
    ...newFilters,

    problemState: newFilters.problemState
      ? [ORDER_PROBLEM_STATES.DISPUTED, ORDER_PROBLEM_STATES.PROBLEM]
      : undefined,
    'created[before]': created?.before,
    'created[after]': created?.after
  };
};

const query = useOrderApi().findAllQuery({
  filters,
  relations: ['seller', 'buyer', 'delivery']
});

const { data: deliveries } = useDeliveryApi().findAllQuery();

const statuses = Object.values(ORDER_STATES).map(state => ({
  value: state,
  label: t(`order.status.${state}`)
}));

const deliveryModes = computed(() => {
  if (!deliveries.value) return [];

  return deliveries.value.map(({ tag, id }) => ({
    value: id,
    label: t(`delivery.modes.${tag}`)
  }));
});

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
    :has-selector-column="false"
    :row-detail-target="
      row => ({ name: 'AdminOrderDetails', params: { id: row.id } })
    "
    @filter-change="onFilterChange"
  >
    <DataTableColumn
      name="id"
      :label="t('dataTable.label.id')"
      width="80"
      is-filterable
    />

    <DataTableColumn
      v-slot="{ row }"
      name="created"
      :label="t('dataTable.label.created')"
      width="160"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      :tooltip-label="({ row }) => row.formatCreated()"
      is-highlightable
      is-filterable
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.formatCreated("dd-MM-yy à kk'h'mm") }}
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="seller.email"
      :label="t('dataTable.label.seller')"
      width="200"
      is-filterable
      filter-name="orderSeller.user.email"
      is-highlightable
    >
      <dsp-truncated-text>
        <router-link
          v-if="row.seller"
          :to="{ name: 'AdminUserDetails', params: { slug: row.seller?.slug } }"
        >
          {{ row.seller?.email }}
        </router-link>
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="buyer.email"
      :label="t('dataTable.label.buyer')"
      width="200"
      is-filterable
      filter-name="orderUser.email"
      is-highlightable
    >
      <dsp-truncated-text>
        <router-link
          v-if="row.buyer"
          :to="{ name: 'AdminUserDetails', params: { slug: row.buyer?.slug } }"
        >
          {{ row.buyer?.email }}
        </router-link>
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="itemCount"
      :label="t('dataTable.label.numbArticles')"
      width="80"
      :type="DATATABLE_COLUMN_TYPES.NUMBER"
      :highlight-options="{ predicate: row => row._orderItems.length }"
      is-highlightable
      is-hidden
    >
      {{ row._orderItems.length }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="delivery"
      :label="t('dataTable.label.modeShipping')"
      :type="DATATABLE_COLUMN_TYPES.ENUM"
      :enum-values="deliveryModes"
      is-highlightable
      :highlight-options="{ predicate: row => row.delivery.id }"
    >
      <dsp-truncated-text>
        {{ t(`delivery.modes.${row.delivery.tag}`) }}
      </dsp-truncated-text>
    </DataTableColumn>

    <DataTableColumn
      name="formatedPrice"
      :label="t('dataTable.label.price')"
      width="150"
      :type="DATATABLE_COLUMN_TYPES.NUMBER"
      is-highlightable
    />

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
      name="problemState"
      :label="t('dataTable.label.dispute')"
      :type="DATATABLE_COLUMN_TYPES.BOOLEAN"
      is-hidden
      is-filterable
      filter-tag="En litige"
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
  color: var(--color-green-700);
}
</style>
