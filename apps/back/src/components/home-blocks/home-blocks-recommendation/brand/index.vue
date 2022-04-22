<script>
export default { name: 'RecommendedBrand' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRecommendedBrandApi } from '@dsp/core';
import { Brand } from '@dsp/business';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableCustomAction from '@/components/data-table/data-table-custom-action/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import HomeBlocksBrandModal from '@/components/home-blocks/home-blocks-modal/brand/index.vue';

const { t } = useI18n();
const isRecommendedBrandModalOpened = ref(false);
const { findAllQuery, deleteMutation, updateMutation } =
  useRecommendedBrandApi();
const queryRecommendedBrands = findAllQuery();
const { mutateAsync: deleteRecommendedBrand } = deleteMutation({
  onSuccess() {
    queryRecommendedBrands.refetch.value();
  }
});
const { mutateAsync: updateRecommandedBrand } = updateMutation();

const sortData = data => data?.slice().sort((a, b) => a.position - b.position);
const onDelete = row => {
  row?.map(({ id }) => deleteRecommendedBrand(id));
};
const updatePosition = (row, newPosition) => {
  updateRecommandedBrand({
    id: row.id,
    entity: { position: newPosition }
  });
};
</script>

<template>
  <DataTable
    id="recommended-brand"
    :query="queryRecommendedBrands"
    :min-row-size="40"
    :sort-data-fn="sortData"
  >
    <DataTableColumn name="brand.name" :label="t('dataTable.label.brand')" />

    <DataTableColumn
      name="brand.totalOfPublishedItems"
      :label="t('dataTable.label.numbArticlesPublished')"
    />

    <DataTableColumn
      v-slot="{ row }"
      name="position"
      :label="t('dataTable.label.position')"
    >
      <dsp-input-text
        :model-value="row.position"
        type="number"
        class="input-position"
        min="0"
        :max="queryRecommendedBrands.data.value?.length - 1"
        @update:modelValue="updatePosition(row, $event)"
        @click="$event.target.select()"
      />
    </DataTableColumn>

    <DataTableRowAction
      name="delete"
      :label="t('dataTable.label.delete')"
      icon="trash"
      @action="onDelete"
    />

    <DataTableCustomAction
      :label="t('dataTable.label.add')"
      icon="add"
      :action="() => (isRecommendedBrandModalOpened = true)"
    />
  </DataTable>

  <HomeBlocksBrandModal
    :is-opened="isRecommendedBrandModalOpened"
    :recommended-brand="queryRecommendedBrands.data"
    @close="isRecommendedBrandModalOpened = false"
    @success="queryRecommendedBrands.refetch.value()"
  />
</template>

<style lang="scss" scoped>
.dsp-input-text :deep(.input-position) {
  max-width: var(--spacing-xxl) !important;
}
</style>
