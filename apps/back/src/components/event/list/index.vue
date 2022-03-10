<script>
export default { name: 'Event' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import DataTableCustomAction from '@/components/data-table/data-table-custom-action/index.vue';

const { t } = useI18n();
const { push } = useRouter();

const emit = defineEmits(['delete', 'edit', 'add']);
defineProps({
  entity: { type: Object, required: true }
});

const getEventStatus = event => {
  if (event.isSalesPeriod) return t('event.isSalesPeriod');
  if (event.isPhysicalPeriod) return t('event.isPhysicalPeriod');
  if (event.isDigitalPeriod) return t('event.isDigitalPeriod');
  if (!event.hasStarted) return t('event.hasStarted');
  return t('event.finished');
};

const onEdit = row => {
  emit('edit', row);
};
const onAdd = row => {
  emit('add', row);
};

const onDelete = rows => {
  emit('delete', rows);
};
</script>

<template>
  <DataTable
    id="events-list"
    :query="entity"
    :min-row-size="50"
    :has-action-bar="true"
    :has-selector-column="true"
    :row-detail-target="
      row => ({
        name: 'AdminEventDetails',
        params: { id: row.id }
      })
    "
  >
    <template #no-result>
      <dsp-center gap="sm">
        <span>Ce site ne possède pas d'événement.</span>
        <dsp-button is-rounded is-outlined left-icon="add" @click="onAdd">
          Ajouter
        </dsp-button>
      </dsp-center>
    </template>
    <DataTableColumn name="id" :label="t('dataTable.label.id')" width="80" />
    <DataTableColumn
      name="title"
      :label="t('dataTable.label.title')"
      width="100"
    />
    <DataTableColumn
      v-slot="{ row }"
      name="startAt"
      :label="t('dataTable.label.dateStart')"
      width="100"
    >
      {{ row.formatStartAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="endAt"
      :label="t('dataTable.label.dateEnd')"
      width="100"
    >
      {{ row.formatEndAt() }}
    </DataTableColumn>
    <DataTableColumn
      name="numberOfItems"
      :label="t('dataTable.label.depositedArticle')"
      width="100"
    />
    <DataTableColumn
      v-slot="{ row }"
      name="address.city"
      :label="t('dataTable.label.city')"
      width="150"
    >
      {{ row.address.city }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="location.name"
      :label="t('dataTable.label.storeOrganizer')"
      width="150"
    >
      {{ row.location.name }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="status"
      :label="t('dataTable.label.status')"
      width="120"
    >
      {{ getEventStatus(row) }}
    </DataTableColumn>
    <DataTableRowAction
      name="block"
      :label="t('dataTable.label.edit')"
      icon="userDelete"
      @action="onEdit"
    />
    <DataTableRowAction
      name="block"
      :label="t('dataTable.label.delete')"
      icon="userDelete"
      @action="onDelete"
    />

    <DataTableCustomAction label="Ajouter" icon="add" :action="onAdd" />
  </DataTable>
</template>
