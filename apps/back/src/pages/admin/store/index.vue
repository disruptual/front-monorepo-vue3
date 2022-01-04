<script>
export default { name: 'AdminStore' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useStoreApi } from '@dsp/core';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();

useBreadCrumbs('Store');

const filters = ref({});
const onFilterChange = newFilters => {
  filters.value = { ...newFilters };
};
const query = useStoreApi().findAllQuery({ filters });

const setDatePicker = () => {};

const isOpen = computed(() => location.open);
const { mutateAsync: updateStore } = useStoreApi().updateMutation();

const updateVisiblity = async store => {
  await updateStore({ id: store.id, dto: { enabled: !store.enabled } });
  query.refetch.value();
};

const onSoftDelete = orders => {
  console.log(orders);
};

const goToDetail = orders => {
  console.log(orders);
};
</script>

<template>
  <DataTable
    id="store_list"
    :query="query"
    :min-row-size="40"
    :has-action-bar="true"
    :has-selector-column="true"
    @row-dbl-click="goToDetail"
    @filter-change="onFilterChange"
  >
    <template #no-result>
      <dsp-center>Cet utilisateur n'a réalisé aucune commande.</dsp-center>
    </template>

    <DataTableColumn
      name="storeCode"
      :label="t('dataTable.label.storeCode')"
      width="100"
      is-filterable
    />
    <DataTableColumn
      name="name"
      :label="t('dataTable.label.name')"
      width="200"
      is-highlightable
      is-filterable
    />
    <DataTableColumn
      v-slot="{ row }"
      name="open"
      :label="t('dataTable.label.state')"
      width="200"
      is-filterable
    >
      <dsp-center>
        <dsp-button
          :class="[row.open ? 'store-open' : 'store-closed']"
          @click="setDatePicker"
        >
          {{ row.open ? 'Ouvert' : 'Fermé' }}
        </dsp-button>
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="enabled"
      :label="t('dataTable.label.visibility')"
      width="200"
      is-filterable
    >
      <dsp-center>
        <dsp-checkbox
          label="visibilité"
          :model-value="row.enabled"
          @change="updateVisiblity(row)"
        />
      </dsp-center>
    </DataTableColumn>
    <DataTableRowAction
      name="block"
      :label="t('dataTable.label.edit')"
      icon="userDelete"
      @action="onSoftDelete"
    />
  </DataTable>
</template>

<style lang="scss">
.dsp-button.store-open {
  background-color: var(--color-success-400);
  &:hover {
    background-color: var(--color-success-600);
  }
}

.dsp-button.store-closed {
  background-color: var(--color-error-500);
  &:hover {
    background-color: var(--color-error-600);
  }
}
</style>
