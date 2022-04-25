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
import HomeBlocksCategoryModal from '@/components/home-blocks/home-blocks-modal/category/index.vue';

const { t } = useI18n();
const isRecommendedCategoryModalOpened = ref(false);
const { findAllQuery, deleteMutation, updateMutation } =
  useRecommendedCategoryApi();
const queryRecommendedCategories = findAllQuery();
const { mutateAsync: deleteRecommendedCategory } = deleteMutation({
  onSuccess() {
    queryRecommendedCategories.refetch.value();
  }
});
const { mutateAsync: updateRecommandedCategory } = updateMutation();

const sortData = data => data?.slice().sort((a, b) => a.position - b.position);
const onDelete = row => {
  row?.map(({ id }) => deleteRecommendedCategory(id));
};
const updatePosition = (row, newPosition) => {
  updateRecommandedCategory({
    id: row.id,
    entity: { position: newPosition }
  });
};
</script>

<template>
  <DataTable
    id="recommended-category"
    :query="queryRecommendedCategories"
    :min-row-size="40"
    :sort-data-fn="sortData"
  >
    <DataTableColumn name="category.name" :label="t('dataTable.label.name')" />

    <DataTableColumn
      name="category.root.name"
      :label="t('dataTable.label.rootCategory')"
    />

    <DataTableColumn
      name="category.totalOfPublishedItems"
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
        :max="queryRecommendedCategories.data.value?.length - 1"
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
      :action="() => (isRecommendedCategoryModalOpened = true)"
    />
  </DataTable>

  <HomeBlocksCategoryModal
    :is-opened="isRecommendedCategoryModalOpened"
    :recommended-category="queryRecommendedCategories.data"
    @close="isRecommendedCategoryModalOpened = false"
    @success="queryRecommendedCategories.refetch.value()"
  />
</template>

<style lang="scss" scoped>
.dsp-input-text :deep(.input-position) {
  max-width: var(--spacing-xxl) !important;
}
</style>
