<script>
export default { name: 'OrderItems' };
</script>

<script setup>
import { useOrderItemApi } from '@dsp/core';
import { useRouter } from 'vue-router';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

const props = defineProps({
  orderId: { type: String, required: true }
});

const { push } = useRouter();

const query = useOrderItemApi().findAllByOrderIdQuery(props.orderId, {
  relations: ['item', 'item.mainMedia', 'item.category']
});

const goToDetail = row => {
  push({ name: 'AdminItemDetails', params: { id: row.id } });
};
</script>

<template>
  <DataTable
    id="order-items"
    :query="query"
    :min-row-size="50"
    :has-action-bar="false"
    :has-selector-column="false"
    @row-dbl-click="goToDetail"
  >
    <template #no-result>
      <dsp-center>Cet tilisateur ne possède aucun article.</dsp-center>
    </template>
    <DataTableColumn name="id" label="Id" width="100" />
    <DataTableColumn
      v-slot="{ row }"
      name="photo"
      label="Photo"
      :tooltip-label="({ row }) => row.item?.mainMedia"
      width="150"
    >
      <dsp-image class="photo" :src="row.item?.mainMedia?.thumbnails?.avatar" />
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date de création"
      :tooltip-label="({ row }) => row.formatCreated()"
      width="200"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn v-slot="{ row }" name="price" label="Prix" width="120">
      {{ row.item.formatedPrice }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="category"
      label="Catégorie"
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
