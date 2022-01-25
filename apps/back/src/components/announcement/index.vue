<script>
export default { name: 'Announcement' };
</script>

<script setup>
import { isWithinInterval } from 'date-fns';
import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import { DATATABLE_COLUMN_TYPES } from '@/utils/constants';

defineProps({
  entity: { type: Object, required: true }
});
const emit = defineEmits(['update', 'delete', 'edit', 'add']);

const goToEdit = row => {
  emit('edit', row);
};

const onSoftDelete = rows => {
  emit('delete', rows);
};

const updateClosable = row => {
  row.closable = !row.closable;
  emit('update', row);
};

const isActive = announcement => {
  return isWithinInterval(new Date(), {
    start: new Date(announcement.startAt),
    end: new Date(announcement.endAt)
  });
};
</script>

<template>
  <DataTable
    id="announcement"
    :query="entity"
    :min-row-size="50"
    :has-action-bar="true"
    :has-selector-column="true"
  >
    <template #no-result>
      <dsp-center gap="sm">
        <span>Ce site ne possède pas de message d'annonce.</span>
        <dsp-button
          is-rounded
          is-outlined
          left-icon="add"
          @click="$emit('add')"
        >
          Ajouter
        </dsp-button>
      </dsp-center>
    </template>
    <DataTableColumn v-slot="{ row }" name="state" label="Actif" width="120">
      <dsp-center class="active-label">
        <span v-show="isActive(row)">En cours</span>
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="startAt"
      label="Date de début"
      width="200"
      is-highlightable
    >
      {{ row.formatStartAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="endAt"
      label="Date de fin"
      width="200"
      :type="DATATABLE_COLUMN_TYPES.DATE"
      is-highlightable
    >
      {{ row.formatEndAt() }}
    </DataTableColumn>
    <DataTableColumn name="content" label="Content" width="40%" />
    <DataTableColumn
      v-slot="{ row }"
      name="closable"
      label="Fermable par l'utilisateur"
      widh="50"
    >
      <dsp-flex justify="center" class="closable-column">
        <dsp-checkbox
          label=""
          :model-value="row.closable"
          @change="updateClosable(row)"
        />
      </dsp-flex>
    </DataTableColumn>
    <DataTableRowAction
      name="delete"
      label="Supprimer"
      icon="remove"
      @action="onSoftDelete"
    />
    <DataTableRowAction
      name="edit"
      label="Editer"
      icon="edit"
      :can-batch="false"
      @action="goToEdit"
    />
  </DataTable>
  <dsp-flex justify="flex-start" gap="lg" class="actions">
    <dsp-button type="button" left-icon="add" @click="$emit('add')">
      Ajouter
    </dsp-button>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.active-label > span {
  padding: 5px 10px;
  color: var(--color-success-400);
  border-radius: 9999px;
  border: solid 2px var(--color-success-300);
}

.closable-column {
  flex-grow: 1;
}

.actions {
  margin-top: var(--spacing-md);
}
</style>
