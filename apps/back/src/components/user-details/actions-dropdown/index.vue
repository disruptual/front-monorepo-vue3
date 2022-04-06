<script>
export default { name: 'UserActionsDropdown' };
</script>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQueryClient } from 'vue-query';
import { User } from '@dsp/business';
import { useUserApi, useCurrentUser } from '@dsp/core';
import { useToast } from '@dsp/ui';

import CreditModal from '../credit-modal/index.vue';

const props = defineProps({
  user: { type: User, required: true }
});
const emit = defineEmits(['success']);

const { t } = useI18n();
const { showError, showSuccess } = useToast();

const { data: currentUser } = useCurrentUser();
const queryClient = useQueryClient();
const isDropdownOpened = ref(false);
const isCreditModalOpened = ref(false);

const { muteMutation, unmuteMutation, updateMutation } = useUserApi();
const { mutate: mute } = muteMutation({
  onSuccess() {
    showSuccess(t('toasts.user.muteSuccess'));
    emit('success');
  },

  onError(err) {
    console.error(err);
    showError(t('toasts.user.muteError'));
  }
});

const { mutate: unmute } = unmuteMutation({
  onSuccess() {
    showSuccess(t('toasts.user.unMuteSuccess'));
    emit('success');
  },

  onError(err) {
    console.error(err);
    showError(t('toasts.user.unmuteError'));
  }
});

const { mutateAsync: update } = updateMutation();
const transactionBlockLabel = computed(() =>
  props.user.transactionWithdrawBlockedAt
    ? 'Débloquer les transactions'
    : 'Bloquer les transactions'
);

const toggleTransactionBlockStatus = async () => {
  const isCurrentlyBlocked = props.user.transactionWithdrawBlockedAt;
  const newValue = isCurrentlyBlocked ? null : new Date();
  try {
    queryClient.setQueryData(`/users/slug/${props.user.slug}`, old => ({
      ...old,
      transactionWithdrawBlockedAt: newValue
    }));

    await update({
      id: props.user.id,
      entity: {
        transactionWithdrawBlockedAt: newValue
      }
    });

    showSuccess(
      t(
        isCurrentlyBlocked
          ? 'toasts.user.unblockTransactionsSuccess'
          : 'toasts.user.blockTransactionsSuccess'
      )
    );
    emit('success');
  } catch (err) {
    console.error(err);
    showError(
      t(
        isCurrentlyBlocked
          ? 'toasts.user.unblockTransactionsError'
          : 'toasts.user.blockTransactionsError'
      )
    );
  }
};
</script>

<template>
  <CreditModal v-model:isOpened="isCreditModalOpened" :user="user" />
  <dsp-dropdown v-model:isOpened="isDropdownOpened">
    <template #toggle><dsp-icon icon="ellipsisH" /></template>
    <template #menu>
      <dsp-dropdown-item
        @click="user.isMuted ? unmute(user.id) : mute(user.id)"
      >
        {{ user.isMuted ? t('user.unmute') : t('user.mute') }}
      </dsp-dropdown-item>

      <dsp-dropdown-item
        v-if="currentUser.isAdmin"
        @click="toggleTransactionBlockStatus"
      >
        {{ transactionBlockLabel }}
      </dsp-dropdown-item>

      <dsp-dropdown-item
        v-if="currentUser.isDAF"
        @click="isCreditModalOpened = true"
      >
        Créditer la cagnotte
      </dsp-dropdown-item>
    </template>
  </dsp-dropdown>
</template>
