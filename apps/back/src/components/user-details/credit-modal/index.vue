<script>
export default { name: 'UserCreditModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { User } from '@dsp/business';
import { useRemunerationApi, useUserApi } from '@dsp/core';
import { useToast } from '@dsp/ui';

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  user: { type: User, required: true }
});

const emit = defineEmits(['update:isOpened']);
const { t } = useI18n();
const { showError, showSuccess } = useToast();

const { data: remunerations } = useRemunerationApi().findAllQuery();
const { mutate: credit } = useUserApi().creditMutation({
  onSuccess() {
    showSuccess('toasts.user.creditSuccess');
    emit('update:isOpened', false);
  },

  onError(err) {
    console.error(err);
    showError('toasts.user.creditError');
  }
});

const formOptions = {
  onSubmit(values) {
    return credit({
      userId: props.user.id,
      amount: values.amount,
      remuneration: values.remuneration ?? remunerations.value[0].id
    });
  }
};

const remunerationOptions = computed(() =>
  remunerations.value?.map?.(rem => ({
    label: t(`remuneration.${rem.remunerationName}`),
    value: rem.id
  }))
);
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="$emit('update:isOpened', false)">
    <h2 class="user_details_credit_content_title">
      {{ t('user.creditModal.title', { user: user.fullName }) }}
    </h2>
    <dsp-alert icon="warning" color-scheme="red">
      {{ t('user.creditModal.alert') }}
    </dsp-alert>
    <dsp-smart-form :form-options="formOptions">
      <dsp-smart-form-field v-slot="slotProps" name="amount" required :min="1">
        <dsp-form-control
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Montant"
          type="number"
        />
      </dsp-smart-form-field>

      <dsp-smart-form-field
        v-if="remunerations?.length > 1"
        v-slot="slotProps"
        name="remuneration"
        required
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          label="Mode de rémunération"
          v-bind="slotProps"
        >
          <dsp-radio-group
            v-model.number="slotProps.field.value"
            :values="remunerationOptions"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-flex justify="flex-end" gap="sm">
        <dsp-button
          type="button"
          is-outlined
          @click="$emit('update:isOpened', false)"
        >
          {{ t('cancel') }}
        </dsp-button>
        <dsp-smart-form-submit>
          {{ t('validate') }}
        </dsp-smart-form-submit>
      </dsp-flex>
    </dsp-smart-form>
  </dsp-modal>
</template>
