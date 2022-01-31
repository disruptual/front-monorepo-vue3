<script>
export default { name: 'UserAutomaticReviews' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useReviewApi } from '@dsp/core';
import { useToast } from '@dsp/ui';

import DataTable from '@/components/data-table/index.vue';
import DataTableColumn from '@/components/data-table/data-table-column/index.vue';
import DataTableRowAction from '@/components/data-table/data-table-row-action/index.vue';

const props = defineProps({
  userId: { type: String, required: true }
});
const { t } = useI18n();
const { showError } = useToast();

const { deleteMutation, findAllReceivedByUserIdQuery } = useReviewApi();

const query = findAllReceivedByUserIdQuery(props.userId, {
  relations: ['order', 'sender'],
  requestOptions: {
    params: { automatic: true }
  }
});

const { mutate: deleteReview, isLoading: isDeleting } = deleteMutation({
  onSuccess() {
    query.refetch.value();
  },
  onError(err) {
    console.error(err);
    showError("Erreur lors de la suppression de l'avis");
  }
});

const selectedReviewId = ref(null);
const onDelete = ([review]) => {
  selectedReviewId.value = review.id;
};
</script>

<template>
  <DataTable
    id="user-items"
    :query="query"
    :min-row-size="40"
    :has-action-bar="false"
    :has-selector-column="false"
  >
    <template #no-result>
      <dsp-center>Cet utilisateur n'a reçu aucun avis.</dsp-center>
    </template>

    <DataTableColumn
      v-slot="{ row }"
      name="created"
      :label="t('dataTable.label.created')"
      :tooltip-label="({ row }) => row.formatCreated()"
    >
      {{ row.formatCreated() }}
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="sender"
      label="Auteur"
      :tooltip-label="({ row }) => row.sender.fullName"
    >
      <router-link
        v-if="row.sender"
        :to="{ name: 'AdminUserDetails', params: { slug: row.sender.slug } }"
      >
        {{ row.sender.fullName }}
      </router-link>
    </DataTableColumn>

    <DataTableColumn
      v-slot="{ row }"
      name="order"
      :label="t('dataTable.label.order')"
    >
      <router-link
        v-if="row.order"
        :to="{ name: 'AdminOrderDetails', params: { id: row.order.id } }"
      >
        {{ row.order?.id }}
      </router-link>
    </DataTableColumn>

    <DataTableRowAction
      name="delete"
      :label="t('dataTable.label.delete')"
      icon="remove"
      :can-batch="false"
      @action="onDelete"
    />
  </DataTable>
  <dsp-modal :is-opened="!!selectedReviewId" @close="selectedReviewId = null">
    <h2>
      {{ t('user.deleteReviewModal.title') }}
    </h2>
    <dsp-alert icon="warning" color-scheme="red">
      {{ t('user.deleteReviewModal.alert') }}
    </dsp-alert>
    <dsp-flex justify="flex-end" gap="sm">
      <dsp-button is-outlined @click="selectedReviewId = null">
        {{ t('cancel') }}
      </dsp-button>
      <dsp-loading-button
        :is-loading="isDeleting"
        @click="deleteReview(selectedReviewId)"
      >
        {{ t('validate') }}
      </dsp-loading-button>
    </dsp-flex>
  </dsp-modal>
</template>

<style lang="scss" scoped>
a {
  color: inherit;
}
</style>
