<script>
export default { name: 'OrderItems' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useOrderItemApi, useCurrency } from '@dsp/core';
import { useRouter } from 'vue-router';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

const props = defineProps({
  orderId: { type: String, required: true }
});

const { t } = useI18n();
const { push } = useRouter();
const { formatPrice } = useCurrency();

const query = useOrderItemApi().findAllByOrderIdQuery(props.orderId, {
  relations: ['item', 'item.mainMedia', 'item.category']
});
</script>

<template>
  <DataTable
    id="order-items"
    :query="query"
    :min-row-size="50"
    :has-action-bar="false"
    :has-selector-column="false"
    :row-detail-target="
      row => ({ name: 'AdminItemDetails', params: { id: row.item.id } })
    "
  >
    <template #no-result>
      <dsp-center>{{ t('orderItems.noResult') }}</dsp-center>
    </template>
    <DataTableColumn
      v-slot="{ row }"
      name="id"
      :label="t('dataTable.label.id')"
      width="100"
    >
      {{ row.item.id }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="photo"
      :label="t('dataTable.label.photo')"
      :tooltip-label="({ row }) => row.item?.mainMedia"
      width="150"
    >
      <dsp-image class="photo" :src="row.item?.mainMedia?.thumbnails?.avatar" />
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      :label="t('dataTable.label.created')"
      :tooltip-label="({ row }) => row.formatCreated()"
      width="200"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="price"
      :label="t('dataTable.label.price')"
      width="120"
    >
      {{ formatPrice(row.item?.price) }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="category"
      :label="t('dataTable.label.category')"
      width="250"
    >
      {{ row.item?.category?.name }}
    </DataTableColumn>
  </DataTable>
</template>

<style lang="scss" scoped>
.photo {
  display: block;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
}
</style>
