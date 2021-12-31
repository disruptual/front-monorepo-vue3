<script>
export default { name: 'Announcement' };
</script>

<script setup>
import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';
import { isWithinInterval } from 'date-fns';

const props = defineProps({
  entity: { type: Object, required: true }
});
const emit = defineEmits(['update', 'delete', 'edit', 'add']);

const goToEdit = row => {
  emit('edit', row);
};

const onSoftDelete = row => {
  emit('delete', row[0]);
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
    :has-selector-column="false"
    @row-dbl-click="goToEdit"
  >
    <template #no-result>
      <dsp-center>Ce site ne possède pas de message d'annonce.</dsp-center>
    </template>
    <DataTableColumn
      v-slot="{ row }"
      name="startAt"
      label="StartAt"
      width="100"
    >
      {{ row.formatStartAt() }}
    </DataTableColumn>
    <DataTableColumn v-slot="{ row }" name="endAt" label="EndAt" width="100">
      {{ row.formatEndAt() }}
    </DataTableColumn>
    <DataTableColumn name="content" label="Content" width="300" />
    <DataTableColumn
      v-slot="{ row }"
      name="closable"
      label="Fermable"
      width="300"
    >
      <dsp-center class="closable">
        <dsp-checkbox
          label=""
          :model-value="row.closable"
          @change="updateClosable(row)"
        />
      </dsp-center>
    </DataTableColumn>
    <DataTableColumn v-slot="{ row }" name="Etat" label="Etat" width="300">
      <dsp-center class="active-label">
        <span v-show="isActive(row)">En cours</span>
      </dsp-center>
    </DataTableColumn>
    <DataTableRowAction
      name="delete"
      label="Supprimer"
      icon="delete"
      @action="onSoftDelete"
    />
  </DataTable>
</template>

<style lang="scss" scoped>
.closable,
.active-label {
  width: 100%;
}

.add {
  margin: var(--spacing-xs);
}

.active-label > span {
  padding: 5px 10px;
  color: var(--color-success-400);
  border-radius: 9999px;
  border: solid 2px var(--color-success-300);
}
</style>
