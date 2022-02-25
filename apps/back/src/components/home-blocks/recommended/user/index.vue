<script>
export default { name: 'RecommendedUser' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRecommendationApi } from '@dsp/core';
import { User } from '@dsp/business';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableCustomAction from '@/components/data-table/data-table-custom-action/index.vue';

const { t } = useI18n();

const query = useRecommendationApi().findAllRecommendedUsers();
const { mutateAsync: updateRecommendedUser } =
  useRecommendationApi().recommendedUsersMutation();

const addRecommendedUser = () => {
  console.log('Add recommended User');
  // updateRecommendedUser({ id: recommended.id, position: recommended.position, });
};

const sortData = data => {
  return data?.slice().sort((a, b) => a.position - b.position);
};
</script>

<template>
  <DataTable
    id="recommended-user"
    :query="query"
    :min-row-size="40"
    :has-selector-column="false"
    :sort-data-fn="sortData"
  >
    <DataTableColumn
      v-slot="{ row }"
      name="user.avatar"
      :label="t('dataTable.label.avatar')"
    >
      <dsp-center style="flex: 1">
        <dsp-avatar :user="new User(row.user)" />
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn name="id" :label="t('dataTable.label.id')" width="80" />
    <DataTableColumn
      name="user.username"
      :label="t('dataTable.label.username')"
      width="80"
    />
    <DataTableColumn
      v-slot="{ row }"
      name="user.ratingAverage"
      :label="t('dataTable.label.note')"
      width="80"
    >
      {{ row.user.ratingAverage + '/5' }}
    </DataTableColumn>

    <DataTableCustomAction
      label="Ajouter"
      icon="add"
      :action="addRecommendedUser"
    />
  </DataTable>
</template>
