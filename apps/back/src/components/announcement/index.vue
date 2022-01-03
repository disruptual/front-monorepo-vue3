<script>
export default { name: 'Announcement' };
</script>

<script setup>
import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import { isWithinInterval } from 'date-fns';

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
  <dsp-flex justify="flex-start" gap="lg">
    <dsp-button class="add" type="button" @click="$emit('add')">
      Ajouter
    </dsp-button>
  </dsp-flex>
  <DataTable
    id="announcement"
    :query="entity"
    :min-row-size="50"
    :has-action-bar="true"
    :has-selector-column="true"
    @row-dbl-click="goToEdit"
  >
    <template #no-result>
      <dsp-center>Ce site ne possède pas de message d'annonce.</dsp-center>
    </template>
    <DataTableColumn name="state" label="Actif" width="120">
      <dsp-center class="active-label">
        <span>En cours</span>
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="startAt"
      label="Date de début"
      width="200"
    >
      {{ row.formatStartAt() }}
    </DataTableColumn>
    <DataTableColumn
      v-slot="{ row }"
      name="endAt"
      label="Date de fin"
      width="200"
    >
      {{ row.formatEndAt() }}
    </DataTableColumn>
    <DataTableColumn name="content" label="Content" width="50%" />
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
  </DataTable>
</template>

<style lang="scss" scoped>
.add {
  margin: var(--spacing-xs);
}

.active-label > span {
  padding: 5px 10px;
  color: var(--color-success-400);
  border-radius: 9999px;
  border: solid 2px var(--color-success-300);
}

.closable-column {
  flex-grow: 1;
}
</style>
