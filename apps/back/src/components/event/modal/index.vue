<script>
export default { name: 'EventModal' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Event } from '@dsp/business';
import { useCategoryApi, useLocationApi } from '@dsp/core';
import { useForm, VALIDATION_MODES } from '@dsp/ui';

const props = defineProps({
  event: { type: Event, default: null },
  isOpened: { type: Boolean, required: true }
});
const emit = defineEmits(['close', 'submit']);

const queryCategories = useCategoryApi().findAllQuery();
const queryLocation = useLocationApi().findAllQuery();

const { t } = useI18n();
const onModalClose = () => {
  emit('close');
};

const form = useForm({
  onSubmit(values) {
    emit('submit', { ...props.event, ...values });
    onModalClose();
  },
  mode: VALIDATION_MODES.ON_BLUR
});
const [, { isValid }] = form;

const locationSelectOptions = computed(() => {
  if (!queryLocation.data.value) return [];

  return queryLocation.data.value.map(location => ({
    label: location.name,
    value: location.uri
  }));
});

const categoriesSelectOptions = computed(() => {
  if (!queryCategories.data.value) return [];

  return queryCategories.data.value.map(category => ({
    label: category.name,
    value: category.uri
  }));
});

const currentStep = ref(0);
</script>

<template>
  <dsp-modal
    :is-opened="isOpened"
    :focus-inside-on-open="false"
    @close="onModalClose()"
  >
    <dsp-center>
      <h2>
        {{ t(props.event ? 'event.title.edit' : 'event.title.create') }}
      </h2>
    </dsp-center>
    <dsp-alert color-scheme="yellow" icon="warning">
      * Les dates doivent être supérieures à la date du jour.
      <br />
      * Les dates de dépôt digital, dépôt physique et vente doivent commencer
      apres la date de début et finir avant la date de fin
    </dsp-alert>

    <dsp-smart-form :form="form" class="form">
      <div v-show="currentStep === 0" class="step">
        <h3>{{ t('event.title.informations') }} (1/3)</h3>
        <dsp-grid :columns="2" gap="md">
          <dsp-smart-form-field
            v-slot="slotProps"
            name="title"
            :initial-value="props.event?.title || undefined"
            required
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.title')"
            />
          </dsp-smart-form-field>

          <dsp-smart-form-field
            v-slot="slotProps"
            name="content"
            :initial-value="props.event?.content || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.description')"
            />
          </dsp-smart-form-field>

          <dsp-smart-form-field
            v-slot="slotProps"
            name="location"
            :initial-value="event?.location"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.OrganiserShop')"
            >
              <dsp-select
                v-model="slotProps.field.value"
                :options="locationSelectOptions"
                :multiple="false"
                v-bind="formControlProps"
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>

          <div class="categories">
            <dsp-smart-form-field
              v-slot="slotProps"
              name="categories"
              :initial-value="props.event?.categories"
              required
            >
              <dsp-form-control
                v-model="slotProps.field.value"
                v-bind="slotProps"
                :label="t('event.label.category')"
              >
                <dsp-multi-select
                  v-model="slotProps.field.value"
                  :options="categoriesSelectOptions"
                  :placeholder="t('event.label.category')"
                  :close-on-select="false"
                />
              </dsp-form-control>
            </dsp-smart-form-field>
          </div>
        </dsp-grid>
      </div>

      <div v-show="currentStep === 1" class="step">
        <h3>{{ t('event.title.location') }} (2/3)</h3>

        <dsp-grid as="fieldset" :columns="3" gap="md">
          <dsp-grid-item as="legend" column="1 / -1">
            {{ t('event.title.address') }}
          </dsp-grid-item>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="address.fullname"
            :initial-value="props.event?.address.fullname || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.address.fullName')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="address.route"
            :initial-value="props.event?.address.route || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.address.route')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="address.postalCode"
            :initial-value="props.event?.address.postalCode || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.address.postalCode')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="address.city"
            :initial-value="props.event?.address.city || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.address.city')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="address.country"
            :initial-value="props.event?.address.country || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.address.country')"
            />
          </dsp-smart-form-field>
        </dsp-grid>

        <dsp-grid as="fieldset" :columns="3" gap="md">
          <dsp-grid-item as="legend" column="1 / -1">
            {{ t('event.title.schedule') }}
          </dsp-grid-item>

          <dsp-smart-form-field
            v-slot="slotProps"
            name="schedule.MONDAY"
            :initial-value="event?.schedule.MONDAY || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.details.day.monday')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="schedule.TUESDAY"
            :initial-value="event?.schedule.TUESDAY || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.details.day.tuesday')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="schedule.WEDNESDAY"
            :initial-value="event?.schedule.WEDNESDAY || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.details.day.wednesday')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="schedule.FRIDAY"
            :initial-value="event?.schedule.FRIDAY || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.details.day.friday')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="schedule.THURSDAY"
            :initial-value="event?.schedule.THURSDAY || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.details.day.thursday')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="schedule.SATURDAY"
            :initial-value="event?.schedule.SATURDAY || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.details.day.saturday')"
            />
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="schedule.SUNDAY"
            :initial-value="event?.schedule.SUNDAY || ''"
          >
            <dsp-form-control
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.details.day.sunday')"
            />
          </dsp-smart-form-field>
        </dsp-grid>
      </div>

      <div v-show="currentStep === 2" class="step">
        <h3>{{ t('event.title.date') }} (3/3)</h3>
        <dsp-flex as="fieldset" align="center" gap="md">
          <legend>{{ t('event.title.startEndAt') }}</legend>

          <dsp-smart-form-field
            v-slot="slotProps"
            name="startAt"
            :initial-value="props.event?.startDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.startAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>

          <dsp-smart-form-field
            v-slot="slotProps"
            name="endAt"
            :initial-value="props.event?.endDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.endAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>
        </dsp-flex>

        <dsp-flex as="fieldset" align="center" gap="md">
          <legend>{{ t('event.title.digitalSubmissionStartEndAt') }}</legend>

          <dsp-smart-form-field
            v-slot="slotProps"
            name="digitalSubmissionStartAt"
            :initial-value="props.event?.digitalSubmissionStartDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.digitalSubmissionStartAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="digitalSubmissionEndAt"
            :initial-value="props.event?.digitalSubmissionEndDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.digitalSubmissionEndAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>
        </dsp-flex>

        <dsp-flex as="fieldset" align="center" gap="md">
          <legend>{{ t('event.title.physicalSubmissionStartEndAt') }}</legend>

          <dsp-smart-form-field
            v-slot="slotProps"
            name="physicalSubmissionStartAt"
            :initial-value="props.event?.physicalSubmissionStartDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.physicalSubmissionStartAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="physicalSubmissionEndAt"
            :initial-value="props.event?.physicalSubmissionEndDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.physicalSubmissionEndAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>
        </dsp-flex>

        <dsp-flex as="fieldset" align="center" gap="md">
          <legend>{{ t('event.title.physicalSubmissionStartEndAt') }}</legend>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="salesStartAt"
            :initial-value="props.event?.salesStartDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.salesStartAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>
          <dsp-smart-form-field
            v-slot="slotProps"
            name="salesEndAt"
            :initial-value="props.event?.salesEndDate || null"
            required
          >
            <dsp-form-control
              v-slot="{ on, ...formControlProps }"
              v-model="slotProps.field.value"
              v-bind="slotProps"
              :label="t('event.label.salesEndAt')"
            >
              <dsp-date-picker
                v-model="slotProps.field.value"
                v-bind="formControlProps"
                datetime
                v-on="on"
              />
            </dsp-form-control>
          </dsp-smart-form-field>
        </dsp-flex>
      </div>

      <dsp-flex justify="flex-end" gap="md" class="actions">
        <dsp-button type="button" is-outlined @click="onModalClose()">
          Annuler
        </dsp-button>
        <dsp-button v-if="currentStep > 0" type="button" @click="currentStep--">
          Précédent
        </dsp-button>
        <dsp-button
          v-if="currentStep !== 2"
          type="button"
          :disabled="!isValid"
          @click="currentStep++"
        >
          Suivant
        </dsp-button>
        <dsp-smart-form-submit v-else>Valider</dsp-smart-form-submit>
      </dsp-flex>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style lang="scss" scoped>
.actions {
  margin-top: var(--spacing-md);
}

h3 {
  text-align: center;
  font-size: var(--font-size-xl);
}

fieldset {
  border: none;
  display: block;
}

legend {
  display: block;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}
</style>
