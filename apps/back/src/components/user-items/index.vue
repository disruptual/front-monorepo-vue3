<script>
export default { name: 'UserItems' };
</script>

<script setup>
import { useItemApi } from '@dsp/core';
import { useRouter } from 'vue-router';
import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

const props = defineProps({
  userId: { type: String, required: true }
});

const query = useItemApi().findAllByUserIdQuery(props.userId);

const { push } = useRouter();
const goToDetail = row => {
  push({ name: 'AdminItemDetails', params: { id: row.id } });
};
</script>

<template>
  <DataTable
    id="user-items"
    :query="query"
    :min-row-size="50"
    :has-action-bar="false"
    :has-selector-column="false"
    @row-dbl-click="goToDetail"
  >
    <template #no-result>
      <dsp-center>Cet tilisateur ne possède aucun article.</dsp-center>
    </template>

    <DataTableColumn name="id" label="Id" width="80" />
    <DataTableColumn
      v-slot="{ row }"
      name="photo"
      label="Photo"
      :tooltip-label="({ row }) => row.mainMedia?.url"
      width="100"
    >
      <dsp-image class="photo" :src="row.mainMedia?.thumbnails?.avatar" />
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date de création"
      :tooltip-label="({ row }) => row.formatCreated()"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn v-slot="{ row }" name="price" label="Prix" width="100">
      {{ row.formatedPrice }}
    </DataTableColumn>

    <DataTableColumn v-slot="{ row }" name="category" label="Catégorie">
      {{ row.category?.name }}
    </DataTableColumn>
    <DataTableColumn name="publicationState" label="status" />
  </DataTable>
</template>

<style lang="scss" scoped>
.photo {
  display: block;
  width: 50px;
  margin-left: auto;
  margin-right: auto;
}
</style>
