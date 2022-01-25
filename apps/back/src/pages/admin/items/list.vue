<script>
export default { name: 'AdminItemsListPage' };
</script>

<script setup>
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useItemApi } from '@dsp/core';
import { useI18n } from 'vue-i18n';
import { ITEM_PUBLICATION_STATES } from '@dsp/business';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

useBreadCrumbs('Annonces');

const query = useItemApi().findAllQuery({
  filters,
  relations: ['user', 'mainMedia', 'category  '],
  requestOptions: {
    params: { display: 'all' }
  }
});

const { t } = useI18n();

const publicationStates = Object.values(ITEM_PUBLICATION_STATES).map(state => ({
  value: state,
  label: t(`item.publicationState.${state}`)
}));
</script>

<template>
  <DataTable
    id="items-list"
    :query="query"
    :min-row-size="50"
    :row-detail-target="
      row => ({ name: 'AdminItemDetails', params: { id: row.id } })
    "
  >
    <DataTableColumn
      name="id"
      :label="t('dataTable.label.id')"
      width="80"
      is-filterable
    />
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
      :type="DATATABLE_COLUMN_TYPES.DATE"
      is-highlightable
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn
      name="title"
      :label="t('dataTable.label.title')"
      width="80"
      is-filterable
    />
    <DataTableColumn
      name="formatedPrice"
      :label="t('dataTable.label.price')"
      width="80"
    />

    <DataTableColumn
      v-slot="{ row }"
      name="category"
      :label="t('dataTable.label.category')"
      is-highlightable
      :highlight-options="{ predicate: row => row.category?.name }"
    >
      {{ row.category?.name }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="seller"
      :label="t('dataTable.label.seller')"
      is-filterable
    >
      <router-link
        v-if="row.user"
        :to="{ name: 'AdminUserDetails', params: { slug: row.user?.slug } }"
      >
        {{ row.user?.email }}
      </router-link>
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="publicationState"
      :label="t('dataTable.label.status')"
      :type="DATATABLE_COLUMN_TYPES.ENUM"
      :enum-values="publicationStates"
      is-highlightable
      is-filterable
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

a {
  color: inherit;
}
</style>
