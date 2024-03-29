<script>
export default { name: 'RecommendedUser' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRecommendedUserApi } from '@dsp/core';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import DataTableCustomAction from '@/components/data-table/data-table-custom-action/index.vue';
import HomeBlocksUserModal from '@/components/home-blocks/home-blocks-modal/user/index.vue';

const { t } = useI18n();
const isModalOpened = ref(false);

const { deleteMutation, findAllQuery, updateMutation } =
  useRecommendedUserApi();
const query = findAllQuery();
const { mutateAsync: deleteRecommendedUser } = deleteMutation({
  onSuccess() {
    query.refetch.value();
  }
});
const { mutateAsync: updateRecommandedUser } = updateMutation();

const sortFunction = data =>
  data?.slice().sort((a, b) => a.position - b.position);

const getRatingLabel = note => {
  const NOTE_DENOMINATOR = 5;
  return note ? `${note}/${NOTE_DENOMINATOR}` : t('dataTable.label.noValue');
};

const onAdd = () => {
  isModalOpened.value = true;
};
const onDelete = row => {
  row?.map(({ id }) => deleteRecommendedUser(id));
};

const updatePosition = (row, newPosition) => {
  updateRecommandedUser({
    id: row.id,
    entity: { position: newPosition }
  });
};
</script>

<template>
  <DataTable
    id="recommended-user"
    :query="query"
    :min-row-size="40"
    :sort-data-fn="sortFunction"
  >
    <DataTableColumn
      v-slot="{ row }"
      name="user.avatar"
      :label="t('dataTable.label.avatar')"
    >
      <dsp-center style="flex: 1">
        <dsp-avatar :user="row" />
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn name="user.slug" :label="t('dataTable.label.slug')" />
    <DataTableColumn
      v-slot="{ row }"
      name="user.ratingAverage"
      :label="t('dataTable.label.note')"
    >
      {{ getRatingLabel(row.user.ratingAverage) }}
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
        :max="query.data.value?.length - 1"
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

  <HomeBlocksUserModal
    :is-opened="isModalOpened"
    :recommended-user="query.data"
    @close="isModalOpened = false"
    @success="query.refetch.value()"
  />
</template>

<style lang="scss" scoped>
.dsp-input-text :deep(.input-position) {
  max-width: var(--spacing-xxl) !important;
}
</style>
