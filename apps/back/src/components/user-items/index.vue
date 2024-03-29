<script>
export default { name: 'UserItems' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useItemApi } from '@dsp/core';
import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
const props = defineProps({
  userId: { type: String, required: true }
});

const { t } = useI18n();

const query = useItemApi().findAllByUserIdQuery(props.userId);
</script>

<template>
  <DataTable
    id="user-items"
    :query="query"
    :min-row-size="50"
    :has-action-bar="false"
    :has-selector-column="false"
    :row-detail-target="
      row => ({ name: 'AdminItemDetails', params: { id: row.id } })
    "
  >
    <template #no-result>
      <dsp-center>Cet utilisateur ne possède aucun article.</dsp-center>
    </template>

    <DataTableColumn name="id" :label="t('dataTable.label.id')" width="40" />
    <DataTableColumn
      v-slot="{ row }"
      name="photo"
      :label="t('dataTable.label.photo')"
      :tooltip-label="({ row }) => row.mainMedia?.url"
      width="100"
    >
      <dsp-image class="photo" :src="row.mainMedia?.thumbnails?.avatar" />
    </DataTableColumn>
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
      name="price"
      :label="t('dataTable.label.price')"
    >
      {{ row.formatedPrice }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="category"
      :label="t('dataTable.label.category')"
    >
      {{ row.category?.name }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="publicationState"
      :label="t('dataTable.label.status')"
    >
      {{ t(`item.publicationState.${row.publicationState}`) }}
    </DataTableColumn>
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
