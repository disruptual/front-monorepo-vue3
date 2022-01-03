<script>
export default { name: 'AnnouncementModal' };
</script>

<script setup>
import { Announcement } from '@dsp/business';

const props = defineProps({
  announcement: { type: Announcement, default: null },
  isEditing: { type: Boolean, required: true }
});

const emit = defineEmits(['close', 'submit']);

const onModalClose = () => {
  emit('close');
};

const formOptions = {
  onSubmit(values) {
    // @TODO values.closable => null by form submit, don't know why.
    // This failed calls to api
    values.closable = Boolean(values.closable);
    emit('submit', { ...props.announcement, ...values });
    onModalClose();
  }
};
</script>

<template>
  <dsp-modal :is-opened="isEditing" @close="onModalClose()">
    <dsp-smart-form :form-options="formOptions" class="form">
      <dsp-smart-form-field
        v-slot="slotProps"
        name="startAt"
        :initial-value="announcement?.dateFormatStartAt() || null"
        required
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Date de début"
        >
          <dsp-date-picker
            id="announcement-form-start-at"
            v-model="slotProps.field.value"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="endAt"
        :initial-value="announcement?.dateFormatEndAt() || null"
        required
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Date de fin"
        >
          <dsp-date-picker
            id="announcement-form-end-at"
            v-model="slotProps.field.value"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="closable"
        :initial-value="announcement?.closable || false"
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
        >
          <dsp-checkbox
            label="Fermable par l'utilisateur"
            :model-value="slotProps.field.value"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="content"
        :initial-value="announcement?.content || ''"
        required
      >
        <dsp-form-control
          v-slot="{ on, ...formControlProps }"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          label="Contenu"
        >
          <dsp-input-textarea
            v-model="slotProps.field.value"
            v-bind="formControlProps"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>
      <dsp-smart-form-field
        type="hidden"
        name="technicalId"
        :initial-value="announcement?.technicalId || 'header'"
      ></dsp-smart-form-field>

      <dsp-flex justify="center">
        <dsp-smart-form-submit>Submit</dsp-smart-form-submit>
      </dsp-flex>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style lang="scss" scoped>
.form {
  padding: var(--spacing-xl);
}
</style>
