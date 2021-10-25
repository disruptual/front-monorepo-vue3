<script>
export default { name: 'AdminItemsListPage' };
</script>

<script setup>
import { useRouter } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useItemApi } from '@dsp/core';
import { useI18n } from 'vue-i18n';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

useBreadCrumbs('Annonces');
const { push } = useRouter();

const query = useItemApi().findAllQuery({
  relations: ['mainMedia', 'category', 'user']
});

const goToDetail = row => {
  push({ name: 'AdminItemDetails', params: { id: row.id } });
};

const { t } = useI18n();
</script>

<template>
  <DataTable :query="query" :min-row-size="50" @row-dbl-click="goToDetail">
    <DataTableColumn name="id" label="Id" width="80" />
    <DataTableColumn
      v-slot="{ row }"
      name="photo"
      label="Photo"
      :tooltip-label="({ row }) => row.mainMedia?.url"
      width="100"
    >
      <dsp-image class="photo" :src="row.mainMedia?.thumbnails?.avatar" />
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="created"
      label="Date de création"
      :tooltip-label="({ row }) => row.formatCreated()"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn v-slot="{ row }" name="price" label="Prix" width="100">
      {{ row.formatedPrice }}
    </DataTableColumn>

    <DataTableColumn v-slot="{ row }" name="category" label="Catégorie">
      {{ row.category?.name }}
    </DataTableColumn>

    <DataTableColumn v-slot="{ row }" name="seller" label="Vendeur">
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
      label="status"
      width="100"
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
