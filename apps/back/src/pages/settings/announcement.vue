<script>
export default { name: 'SettingsAnnouncement' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useAnnouncementApi } from '@dsp/core';
import AnnouncementComponent from '@/components/announcement/index.vue';
import AnnouncementModal from '@/components/announcement/modal/index.vue';
import { useToast } from '@dsp/ui';

const { t } = useI18n();
useBreadCrumbs(t('breadcrumb.announcements'));
const { showSuccess, showError } = useToast();

const query = useAnnouncementApi().findAllQuery({
  params: { requestOptions: { technicalId: 'header' } }
});
const { updateMutation, deleteMutation, createMutation } = useAnnouncementApi();
const { mutateAsync: updateAnnouncement } = updateMutation();
const { mutateAsync: deleteAnnouncement } = deleteMutation();
const { mutateAsync: createAnnouncement } = createMutation();

const isEditing = ref(false);
const selectedAnnouncement = ref(null);

const onSubmit = async row => {
  try {
    if (row.id) {
      await updateAnnouncement({ id: row.id, entity: row });
    } else {
      await createAnnouncement(row);
    }
    query.refetch.value();
  } catch (err) {
    console.error(err);
    showError(t('toasts.announcement.createError'));
  }
};

const onDelete = async rows => {
  try {
    await Promise.all(rows.map(row => deleteAnnouncement(row.id)));
    query.refetch.value();
    showSuccess(t('toasts.announcement.removeSuccess'));
  } catch (err) {
    showError(t('toasts.announcement.removeError'));
    console.lerror(err);
  }
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
  <dsp-surface>
    <h2>Message D'annonce</h2>
    <dsp-alert>
      Définissez ici des messages d'annonce qui apparaitront en haut de votre
      application sur une période définie.
    </dsp-alert>
    <AnnouncementComponent
      :entity="query"
      @update="onSubmit"
      @delete="onDelete"
      @edit="onEdit"
      @add="onAdd"
    />
    <AnnouncementModal
      :announcement="selectedAnnouncement"
      :is-opened="isEditing"
      @close="isEditing = false"
      @submit="onSubmit"
    />
  </dsp-surface>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 0;
}
</style>
