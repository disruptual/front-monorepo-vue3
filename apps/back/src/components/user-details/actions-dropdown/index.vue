<script>
export default { name: 'UserActionsDropdown' };
</script>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
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
const isDropdownOpened = ref(false);
const isCreditModalOpened = ref(false);

const { muteMutation, unmuteMutation } = useUserApi();
const { mutate: mute } = muteMutation({
  onSuccess() {
    showSuccess(t('toasts.user.muteSuccess', 1));
    emit('success');
  },

  onError(err) {
    console.error(err);
    showError(t('toasts.user.muteError', 1));
  }
});

const { mutate: unmute } = unmuteMutation({
  onSuccess() {
    showSuccess(t('toasts.user.muteSuccess', 1));
    emit('success');
  },

  onError(err) {
    console.error(err);
    showError(t('toasts.user.muteError', 1));
  }
});
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
        v-if="currentUser.isDAF"
        @click="isCreditModalOpened = true"
      >
        Créditer la cagnotte
      </dsp-dropdown-item>
    </template>
  </dsp-dropdown>
</template>
