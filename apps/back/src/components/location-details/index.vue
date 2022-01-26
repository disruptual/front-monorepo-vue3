<script>
export default { name: 'LocationDetails' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Location } from '@dsp/business';
import { useLocationApi } from '@dsp/core';
import { useAddressApi } from '@dsp/core';

import { useForm, useToast } from '@dsp/ui';
const emit = defineEmits(['success']);

const { t } = useI18n();
const props = defineProps({
  location: { type: Location, required: true }
});

const isEditing = ref(false);
const { showError, showSuccess } = useToast();
const { mutate: updateAddress } = useAddressApi().updateMutation();
const { mutate: updateLocation } = useLocationApi().updateMutation();

const onSubmit = async values => {
  console.log(props.location.address.id);
  try {
    await Promise.all([
      updateAddress({ id: props.location.address.id, entity: values }),
      updateLocation({ id: props.location.id, entity: values })
    ]);
    showSuccess(t('toasts.location.updateSuccess'));
    emit('success');
  } catch (err) {
    console.error(err);
    showError(t('toasts.location.updateError'));
  }
};
const form = useForm({
  onSubmit
});
</script>

<template>
  <div class="location-details">
    <dsp-switch
      v-model="isEditing"
      class="editing-switch"
      :label="t('location.details.form.editModeSwitchLabel')"
    />
    <dsp-smart-form :form="form">
      <div>{{ t('location.details.form.name') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="name"
        :initial-value="location.name"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.name }}</div>
      <div>{{ t('location.details.form.route') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="route"
        :initial-value="location.address.route"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.address.route }}</div>
      <div>{{ t('location.details.form.additional') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="additionnal"
        :initial-value="location.address.additional"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.address.additional }}</div>
      <div>{{ t('location.details.form.postalCode') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="postalCode"
        :initial-value="location.address.postalCode"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.address.postalCode }}</div>
      <div>{{ t('location.details.form.city') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="city"
        :initial-value="location.address.city"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.address.city }}</div>
      <div>{{ t('location.details.form.country') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="country"
        :initial-value="location.address.country"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.address.country }}</div>
      <div>{{ t('location.details.form.phone') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="phone"
        :initial-value="location.phone"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.phone }}</div>
      <div>{{ t('location.details.form.email') }}</div>
      <dsp-smart-form-field
        v-if="isEditing"
        v-slot="slotProps"
        name="email"
        :initial-value="location.email"
        required
      >
        <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
      </dsp-smart-form-field>
      <div v-else>{{ location.email }}</div>
      <div>{{ t('location.details.form.schedule.title') }}</div>
      <div class="container">
        <dsp-grid
          v-for="(schedule, key) in location.schedule"
          :key="key"
          :columns="2"
          class="schedule"
        >
          <span class="schedule-day">
            {{ t(`location.details.form.schedule.weekDays.${key}`) }}
          </span>

          <span class="schedule-day">{{ schedule }}</span>
        </dsp-grid>
      </div>
      <dsp-center
        v-if="isEditing"
        direction="row"
        class="form-actions"
        gap="sm"
      >
        <dsp-button type="button" is-outlined @click="isEditing = false">
          {{ t('location.details.form.cancel') }}
        </dsp-button>
        <dsp-smart-form-submit v-if="isEditing">
          {{ t('location.details.form.submit') }}
        </dsp-smart-form-submit>
      </dsp-center>
    </dsp-smart-form>
  </div>
</template>

<style lang="scss" scoped>
.editing-switch {
  margin-left: auto;
  width: fit-content;
  font-size: var(--font-size-sm);
}

form {
  margin-top: var(--spacing-sm);
  line-height: 1.5;

  @include desktop-only {
    --label-min-width: 180px;
    display: grid;
    grid-template-columns: minmax(var(--label-min-width), auto) 1fr;
    gap: var(--spacing-sm);
    align-items: center;
  }

  & > *:nth-child(odd) {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);
    @include desktop-only {
      text-align: right;
    }
    @include not-desktop {
      margin-top: var(--spacing-md);
    }
  }
  .container {
    grid-row: 9;
    grid-column: 2;
  }
  .schedule {
    margin: 0;
    font-weight: var(--font-weight-regular);
  }
  .schedule-day {
    font-size: var(--font-size-md);
  }
  .form-actions {
    grid-column: 1 / -1;
  }
}
</style>
