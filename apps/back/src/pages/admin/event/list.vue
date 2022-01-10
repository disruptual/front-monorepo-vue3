<script>
export default { name: 'AdminEventsListPage' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useEventApi } from '@dsp/core';
import { useI18n } from 'vue-i18n';
import { useToast } from '@dsp/ui';

import EventModal from '@/components/event/modal/index.vue';
import EventComponent from '@/components/event/list/index.vue';

const { updateMutation, deleteMutation, createMutation } = useEventApi();
const { mutateAsync: updateEvent } = updateMutation();
const { mutateAsync: deleteEvent } = deleteMutation();
const { mutateAsync: createEvent } = createMutation();

useBreadCrumbs('Evenement');
const { t } = useI18n();
const { showSuccess, showError } = useToast();
const isEditing = ref(false);
const selectedEvent = ref(null);

const queryOptions = computed(() => ({
  filters: {
    'sort[createdDate]': 'desc',
    display: 'all'
  }
}));

const query = useEventApi().findAllQuery(queryOptions);

const onEdit = row => {
  selectedEvent.value = row[0];
  isEditing.value = true;
};

const onAdd = () => {
  selectedEvent.value = null;
  isEditing.value = true;
};

const onSubmit = async row => {
  selectedEvent.value = null;
  try {
    if (row.id) {
      await updateEvent({ id: row.id, entity: row });
    } else {
      await createEvent(row);
    }
    showError(t('toasts.event.updateSuccess'));
    query.refetch.value();
  } catch (err) {
    showError(t('toasts.event.createError'));
    console.error(err);
  }
};

const onDelete = async rows => {
  try {
    await Promise.all(rows.map(row => deleteEvent(row.id)));
    query.refetch.value();
    showSuccess(t('toasts.event.removeSuccess'));
  } catch (err) {
    showError(t('toasts.event.removeError'));
    console.error(err);
  }
};
</script>

<template>
  <EventComponent
    :entity="query"
    @update="onSubmit"
    @delete="onDelete"
    @edit="onEdit"
    @add="onAdd"
  />

  <EventModal
    :event="selectedEvent"
    :is-opened="isEditing"
    @close="isEditing = false"
    @submit="onSubmit"
  />
</template>

<style lang="scss" scoped></style>
