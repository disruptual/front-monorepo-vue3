<script>
export default { name: 'AdminItemsListPage' };
</script>

<script setup>
import { ref } from 'vue';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useItemApi } from '@dsp/core';
import { useI18n } from 'vue-i18n';
import {
  ITEM_PUBLICATION_STATES,
  ITEM_PUBLICATION_STATE_TRANSITIONS
} from '@dsp/business';
import { useToast } from '@dsp/ui';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

useBreadCrumbs('Annonces');
const { t } = useI18n();
const { showError } = useToast();

const defaultFilter = { display: 'all', 'sort[updated]': 'desc' };
const filters = ref({ ...defaultFilter });
const onFilterChange = newFilters => {
  filters.value = { ...newFilters, ...defaultFilter };
};

const { findAllQuery, updateManyMutation } = useItemApi();
const query = findAllQuery({
  relations: ['user', 'mainMedia', 'category  '],
  filters
});
const { mutate: updateItems } = updateManyMutation({
  onError() {
    showError(t('toasts.item.updateError'));
  },

  onSettled() {
    query.refetch.value();
  }
});

const publicationStates = Object.values(ITEM_PUBLICATION_STATES).map(state => ({
  value: state,
  label: t(`item.publicationState.${state}`)
}));

const onUnpublish = rows => {
  if (!rows.some(row => row.canUnpublish)) {
    showError(t('toasts.item.unpublishInvalid'));
  }

  updateItems(
    rows.map(row => ({
      id: row.id,
      entity: { publicationStateTransition: row.unpublishTransition }
    }))
  );
};

const onDelete = rows => {
  if (!rows.some(row => row.canDelete)) {
    showError(t('toasts.item.deleteInvalid'));
  }

  updateItems(
    rows.map(row => ({
      id: row.id,
      entity: { publicationStateTransition: row.deleteTransition }
    }))
  );
};

const onRepublish = rows => {
  if (!rows.some(row => row.canRepublish)) {
    showError(t('toasts.item.republishInvalid'));
  }

  updateItems(
    rows.map(row => ({
      id: row.id,
      entity: {
        publicationStateTransition: ITEM_PUBLICATION_STATE_TRANSITIONS.REPUBLISH
      }
    }))
  );
};
</script>

<template>
  <DataTable
    id="items-list"
    :query="query"
    :min-row-size="50"
    :row-detail-target="
      row => ({ name: 'AdminItemDetails', params: { id: row.id } })
    "
    @filter-change="onFilterChange"
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
      <dsp-truncated-text :has-tooltip="false">
        {{ row.formatCreated("dd-MM-yy à kk'h'mm") }}
      </dsp-truncated-text>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="updated"
      :label="t('dataTable.label.updated')"
      :tooltip-label="({ row }) => row.formatUpdated()"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      is-highlightable
    >
      <dsp-truncated-text :has-tooltip="false">
        {{ row.formatUpdated("dd-MM-yy à kk'h'mm") }}
      </dsp-truncated-text>
    </DataTableColumn>
    <DataTableColumn
      name="title"
      :label="t('dataTable.label.title')"
      width="80"
      is-filterable
      is-highlightable
    />

    <DataTableColumn
      name="slug"
      :label="t('dataTable.label.slug')"
      is-filterable
      is-highlightable
      is-hidden
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
      is-highlightable
      :highlight-options="{ predicate: row => row.user?.email }"
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

    <DataTableRowAction
      name="unpublish"
      :label="t('dataTable.label.unpublish')"
      icon="unpublish"
      @action="onUnpublish"
    />

    <DataTableRowAction
      name="delete"
      :label="t('dataTable.label.delete')"
      icon="trash"
      @action="onDelete"
    />

    <DataTableRowAction
      name="republish"
      :label="t('dataTable.label.republish')"
      icon="boxOpen"
      @action="onRepublish"
    />
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
