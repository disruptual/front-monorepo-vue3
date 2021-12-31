<script>
export default { name: 'AdminAnnouncement' };
</script>

<script setup>
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useAnnouncementApi } from '@dsp/core';
import AnnouncementComponent from '@/components/announcement/index.vue';
import AnnouncementModal from '@/components/announcement/modal/index.vue';
import { ref } from 'vue';

useBreadCrumbs('Les messages annonces');

const query = useAnnouncementApi().findAllQuery({
  params: { technicalId: 'header' }
});
const { mutateAsync: updateAnnouncement } =
  useAnnouncementApi().updateMutation();
const { mutateAsync: deleteAnnouncement } =
  useAnnouncementApi().deleteMutation();
const { mutateAsync: createAnnouncement } =
  useAnnouncementApi().createMutation();

const isEditing = ref(false);
const selectedAnnouncement = ref(null);

const onSubmit = async row => {
  try {
    if (row.id) {
      await updateAnnouncement({ id: row.id, entity: row });
    } else {
      await createAnnouncement(row);
    }
  } catch (err) {
    console.log(err);
  }
  query.refetch.value();
};

const onDelete = async row => {
  await deleteAnnouncement(row.id);
  query.refetch.value();
};

const onEdit = row => {
  selectedAnnouncement.value = row;
  isEditing.value = true;
};
const onAdd = () => {
  selectedAnnouncement.value = null;
  isEditing.value = true;
};
</script>

<template>
  <AnnouncementComponent
    :entity="query"
    @update="onSubmit"
    @delete="onDelete"
    @edit="onEdit"
    @add="onAdd"
  />
  <AnnouncementModal
    :announcement="selectedAnnouncement"
    :is-editing="isEditing"
    @close="isEditing = false"
    @submit="onSubmit"
  />
</template>

<style lang="scss" scoped></style>
