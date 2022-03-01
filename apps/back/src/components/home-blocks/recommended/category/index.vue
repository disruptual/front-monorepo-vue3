<script>
export default { name: 'RecommendedCategory' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRecommendedCategoryApi } from '@dsp/core';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableCustomAction from '@/components/data-table/data-table-custom-action/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import RecommendedCategoryModal from '@/components/home-blocks/modal/category/index.vue';

const { t } = useI18n();
const isRecommendedCategoryModalOpened = ref(false);
const { findAllQuery, deleteMutation } = useRecommendedCategoryApi();
const queryRecommendedCategories = findAllQuery();
const { mutateAsync: deleteRecommendedCategory } = deleteMutation({
  onSuccess() {
    queryRecommendedCategories.refetch.value();
  }
});

const sortData = data => data?.slice().sort((a, b) => a.position - b.position);
const onDelete = row => {
  row?.map(({ id }) => deleteRecommendedCategory(id));
};
</script>

<template>
  <DataTable
    id="recommended-category"
    :query="queryRecommendedCategories"
    :min-row-size="40"
    :sort-data-fn="sortData"
  >
    <DataTableColumn name="category.name" label="Catégorie mère">
      en attente dev back
    </DataTableColumn>

    <DataTableColumn name="category.name" :label="t('dataTable.label.name')" />

    <DataTableColumn name="category" :label="t('dataTable.label.numbArticles')">
      en attente dev back
    </DataTableColumn>

    <DataTableRowAction
      name="delete"
      :label="t('dataTable.label.delete')"
      icon="trash"
      @action="onDelete"
    />

    <DataTableCustomAction
      label="Ajouter"
      icon="add"
      :action="() => (isRecommendedCategoryModalOpened = true)"
    />
  </DataTable>

  <RecommendedCategoryModal
    :is-opened="isRecommendedCategoryModalOpened"
    :recommended-category="queryRecommendedCategories.data"
    @close="isRecommendedCategoryModalOpened = false"
    @success="queryRecommendedCategories.refetch.value()"
  />
</template>
