<script>
export default { name: 'AdminEventsListPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useEventApi } from '@dsp/core';
import { useI18n } from 'vue-i18n';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';

useBreadCrumbs('Evenement');
const { t } = useI18n();
const { push } = useRouter();

const queryOptions = computed(() => ({
  filters: {
    'sort[createdDate]': 'desc',
    display: 'all'
  }
}));

const query = useEventApi().findAllQuery(queryOptions);

const getEventStatus = event => {
  if (event.isSalesPeriod) return t('event.isSalesPeriod');
  if (event.isPhysicalPeriod) return t('event.isPhysicalPeriod');
  if (event.isDigitalPeriod) return t('event.isDigitalPeriod');
  if (!event.hasStarted) return t('event.hasStarted');
  return t('event.finished');
};

const goToDetail = row => {
  push({ name: 'AdminEventDetails', params: { id: row.id } });
};
</script>

<template>
  <DataTable
    id="events-list"
    :query="query"
    :min-row-size="50"
    @row-dbl-click="goToDetail"
  >
    <DataTableColumn name="id" :label="t('dataTable.label.id')" width="80" />
    <DataTableColumn
      name="title"
      :label="t('dataTable.label.title')"
      width="80"
    />
    <DataTableColumn
      v-slot="{ row }"
      name="startAt"
      :label="t('dataTable.label.dateStart')"
      width="80"
    >
      {{ row.formatStartAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="endAt"
      :label="t('dataTable.label.dateEnd')"
      width="80"
    >
      {{ row.formatEndAt() }}
    </DataTableColumn>
    <DataTableColumn
      name="numberOfItems"
      :label="t('dataTable.label.depositedArticle')"
      width="80"
    />
    <DataTableColumn
      v-slot="{ row }"
      name="address.city"
      :label="t('dataTable.label.city')"
      width="80"
    >
      {{ row.address.city }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="location.name"
      :label="t('dataTable.label.storeOrganizer')"
      width="80"
    >
      {{ row.location.name }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="status"
      :label="t('dataTable.label.status')"
      width="80"
    >
      {{ getEventStatus(row) }}
    </DataTableColumn>
  </DataTable>
</template>

<style lang="scss" scoped></style>
