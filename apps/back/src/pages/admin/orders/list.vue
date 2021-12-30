<script>
export default { name: 'AdminOrdersListPage' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useOrderApi, useDeliveryApi } from '@dsp/core';
import { ORDER_STATE_TRANSITIONS, DELIVERY_MODES } from '@dsp/business';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

useBreadCrumbs('Commandes');
const { push } = useRouter();
const { t } = useI18n();

const filters = ref({});
const onFilterChange = ({ created, ...newFilters }) => {
  filters.value = {
    ...newFilters,
    'created[before]': created?.before,
    'created[after]': created?.after
  };
};

const query = useOrderApi().findAllQuery({
  filters,
  relations: ['seller', 'buyer', 'orderItems', 'delivery']
});
const { data: deliveries } = useDeliveryApi().findAllQuery();

const goToDetail = row => {
  push({ name: 'AdminOrderDetails', params: { id: row.id } });
};

const statuses = Object.values(ORDER_STATE_TRANSITIONS).map(state => ({
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
    @row-dbl-click="goToDetail"
    @filter-change="onFilterChange"
  >
    <DataTableColumn name="id" label="Id" width="100" is-filterable />

    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date de création"
      width="160"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      :tooltip-label="({ row }) => row.formatCreated()"
      is-highlightable
      is-filterable
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="status"
      label="Statut"
      width="250"
      :type="DATATABLE_COLUMN_TYPES.ENUM"
      :enum-values="statuses"
      is-highlightable
    >
      <dsp-truncated-text class="order-status" :class="getStatusClass(row)">
        {{ t(`order.status.${row.status}`) }}
      </dsp-truncated-text>
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
      name="buyer"
      label="Acheteur"
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
      label="Nb d'articles"
      width="80"
      :type="DATATABLE_COLUMN_TYPES.NUMBER"
      :highlight-options="{ predicate: row => row?.orderItems?.length }"
      is-highlightable
      is-hidden
    >
      {{ row.orderItems?.length }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="delivery"
      label="Mode de livraison"
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
  color: var(--color-green-700);
}
</style>
