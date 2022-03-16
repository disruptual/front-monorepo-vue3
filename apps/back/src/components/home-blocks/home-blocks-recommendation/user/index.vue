<script>
export default { name: 'RecommendedUser' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRecommendedUserApi } from '@dsp/core';
import { User } from '@dsp/business';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import DataTableCustomAction from '@/components/data-table/data-table-custom-action/index.vue';
import HomeBlocksUserModal from '@/components/home-blocks/home-blocks-modal/user/index.vue';

const { t } = useI18n();
const isRecommendedUserModalOpened = ref(false);

const { deleteMutation, findAllQuery } = useRecommendedUserApi();
const recommendedUsersQuery = findAllQuery();
const { mutateAsync: deleteRecommendedUser } = deleteMutation({
  onSuccess() {
    recommendedUsersQuery.refetch.value();
  }
});

const sortData = data => data?.slice().sort((a, b) => a.position - b.position);
const NOTE_DENOMINATOR = 5;
const displayUserNote = note =>
  note ? `${note}/${NOTE_DENOMINATOR}` : t('dataTable.label.noValue');
const onAdd = () => (isRecommendedUserModalOpened.value = true);
const onDelete = row => {
  row?.map(({ id }) => deleteRecommendedUser(id));
};
const updatePosition = (row, newIndex) => {
  const oldIndex = recommendedUsersQuery.data.value.indexOf(row);
  const clone = [...recommendedUsersQuery.data.value];
  clone.splice(oldIndex, 1);
  clone.splice(newIndex, 0, row);
  clone.forEach((recommendedCategory, index) => {
    recommendedCategory.position = index;
  });
};
</script>

<template>
  <DataTable
    id="recommended-user"
    :query="recommendedUsersQuery"
    :min-row-size="40"
    :sort-data-fn="sortData"
  >
    <DataTableColumn
      v-slot="{ row }"
      name="user.avatar"
      :label="t('dataTable.label.avatar')"
    >
      <dsp-center style="flex: 1">
        <dsp-avatar :user="row.user" />
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn name="user.slug" :label="t('dataTable.label.slug')" />
    <DataTableColumn
      v-slot="{ row }"
      name="user.ratingAverage"
      :label="t('dataTable.label.note')"
    >
      {{ displayUserNote(row.user.ratingAverage) }}
    </DataTableColumn>

    <DataTableColumn
      name="user.totalOfPublishedItems"
      :label="t('dataTable.label.numbArticlesPublished')"
    />
    <DataTableColumn
      v-slot="{ row }"
      name="user.reviewsTo"
      :label="t('dataTable.label.numbReviews')"
    >
      {{ row.user.reviewsTo?.length }}
    </DataTableColumn>
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
        :max="recommendedUsersQuery.data.value?.length - 1"
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
      :action="onAdd"
    />
  </DataTable>

  <!-- <HomeBlocksUserModal
    :is-opened="isRecommendedUserModalOpened"
    :recommended-user="recommendedUsersQuery.data"
    @close="isRecommendedUserModalOpened = false"
    @success="recommendedUsersQuery.refetch.value()"
  /> -->
</template>

<style lang="scss" scoped>
.dsp-input-text :deep(.input-position) {
  max-width: var(--spacing-xxl) !important;
}
</style>
