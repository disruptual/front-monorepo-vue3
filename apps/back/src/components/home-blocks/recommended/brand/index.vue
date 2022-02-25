<script>
export default { name: 'RecommendedBrand' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRecommendationApi } from '@dsp/core';
import { Brand } from '@dsp/business';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

const { t } = useI18n();

const query = useRecommendationApi().findAllRecommendedBrands();

const sortData = data => {
  return data?.slice().sort((a, b) => a.position - b.position);
};
</script>

<template>
  <DataTable
    id="recommended-brand"
    :query="query"
    :min-row-size="40"
    :has-selector-column="false"
    :sort-data-fn="sortData"
  >
    <DataTableColumn name="id" :label="t('dataTable.label.id')" />
  </DataTable>
</template>
