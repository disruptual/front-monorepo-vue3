<script>
export default { name: 'AnnouncementModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Announcement } from '@dsp/business';

const props = defineProps({
  announcement: { type: Announcement, default: null },
  isOpened: { type: Boolean, required: true }
});
const emit = defineEmits(['close', 'submit']);

const { t } = useI18n();
const onModalClose = () => {
  emit('close');
};

const formOptions = {
  onSubmit(values) {
    emit('submit', { ...props.announcement, ...values });
    onModalClose();
  }
};

const title = computed(() =>
  t(
    props.announcement
      ? 'announcement.form.edit.title'
      : 'announcement.form.create.title'
  )
);
</script>
<template>
  <dsp-modal
    :is-opened="isOpened"
    :focus-inside-on-open="false"
    @close="onModalClose()"
  >
    <h2>{{ title }}</h2>
    <dsp-smart-form :form-options="formOptions" class="form">
      <dsp-smart-form-field
        v-slot="slotProps"
        name="startAt"
        :initial-value="announcement?.startDate || null"
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
        :initial-value="announcement?.endDate || null"
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
        :initial-value="announcement?.content || null"
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
            :is-resizeable="false"
            v-on="on"
          />
        </dsp-form-control>
      </dsp-smart-form-field>

      <dsp-smart-form-field
        type="hidden"
        name="technicalId"
        :initial-value="announcement?.technicalId || 'header'"
      />

      <dsp-smart-form-submit is-full-width>Submit</dsp-smart-form-submit>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style lang="scss" scoped>
h2 {
  margin-top: 0;
}
</style>
