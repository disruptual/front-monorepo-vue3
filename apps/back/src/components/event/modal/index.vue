<script>
export default { name: 'EventModal' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Event } from '@dsp/business';
import { useCategoryApi, useLocationApi } from '@dsp/core';

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

const formOptions = {
  onSubmit(values) {
    emit('submit', { ...props.event, ...values });
    onModalClose();
  }
};

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
</script>

<template>
  <dsp-modal
    :is-opened="isOpened"
    :focus-inside-on-open="false"
    @close="onModalClose()"
  >
    <dsp-center>
      <h2>
        {{ t(event ? 'event.title.edit' : 'event.title.create') }}
      </h2>
    </dsp-center>
    <dsp-alert color-scheme="yellow" icon="warning">
      * Les dates doivent être supérieures à la date du jour.
      <br />
      * Les dates de dépôt digital, dépôt physique et vente doivent commencer
      apres la date de début et finir avant la date de fin
    </dsp-alert>
    <dsp-smart-form :form-options="formOptions" class="form">
      <div class="grid">
        <dsp-flex
          align="center"
          justify="flex-start"
          direction="column"
          class="dateEvent"
        >
          <dsp-center>
            <h3>{{ t('event.title.date') }}</h3>
          </dsp-center>
          <dsp-flex align="center" justify="flex-start">
            <dsp-center>
              <h4>{{ t('event.title.startEndAt') }}</h4>
            </dsp-center>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="startAt"
              :initial-value="event?.dateFormatStartAt || null"
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
              :initial-value="event?.dateFormatEndAt || null"
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
          <dsp-flex align="center" justify="flex-start">
            <dsp-center>
              <h4>{{ t('event.title.digitalSubmissionStartEndAt') }}</h4>
            </dsp-center>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="digitalSubmissionStartAt"
              :initial-value="event?.dateFormatDigitalSubmissionStartAt || null"
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
              :initial-value="event?.dateFormatDigitalSubmissionEndAt || null"
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
          <dsp-flex align="center" justify="flex-start">
            <dsp-center>
              <h4>{{ t('event.title.physicalSubmissionStartEndAt') }}</h4>
            </dsp-center>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="physicalSubmissionStartAt"
              :initial-value="
                event?.dateFormatPhysicalSubmissionStartAt || null
              "
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
              :initial-value="event?.dateFormatPhysicalSubmissionEndAt || null"
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
          <dsp-flex align="center" justify="flex-start">
            <dsp-center>
              <h4>{{ t('event.title.salesStartEndAt') }}</h4>
            </dsp-center>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="salesStartAt"
              :initial-value="event?.dateFormatSalesStartAt || null"
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
              :initial-value="event?.dateFormatSalesEndAt || null"
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
        </dsp-flex>
        <dsp-flex align="center" justify="center" class="informations">
          <dsp-center>
            <h3>{{ t('event.title.informations') }}</h3>
          </dsp-center>
          <dsp-flex gap="xl" wrap="nowrap">
            <dsp-flex>
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
                :initial-value="event?.content || ''"
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
                  :initial-value="event?.categories"
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
                    />
                  </dsp-form-control>
                </dsp-smart-form-field>
              </div>
            </dsp-flex>

            <dsp-flex>
              <dsp-smart-form-field
                v-slot="slotProps"
                name="address.fullname"
                :initial-value="event?.address.fullname || ''"
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
                :initial-value="event?.address.route || ''"
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
                :initial-value="event?.address.postalCode || ''"
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
                :initial-value="event?.address.city || ''"
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
                :initial-value="event?.address.country || ''"
              >
                <dsp-form-control
                  v-model="slotProps.field.value"
                  v-bind="slotProps"
                  :label="t('event.label.address.country')"
                />
              </dsp-smart-form-field>
            </dsp-flex>
          </dsp-flex>
        </dsp-flex>
        <dsp-flex
          align="center"
          justify="flex-start"
          direction="column"
          class="schedule"
        >
          <dsp-center>
            <h3>{{ t('event.title.schedule') }}</h3>
          </dsp-center>
          <dsp-flex>
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
          </dsp-flex>
          <dsp-flex>
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
          </dsp-flex>
          <dsp-flex>
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
          </dsp-flex>
          <dsp-flex>
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
          </dsp-flex>
        </dsp-flex>
      </div>
      <dsp-smart-form-submit is-full-width>Submit</dsp-smart-form-submit>
    </dsp-smart-form>
  </dsp-modal>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: var(--spacing-md);

  @include not-mobile {
    grid-template-columns: minmax(0, 4fr) minmax(0, 3fr);
    grid-template-areas:
      'dateEvent schedule'
      'informations informations';
  }

  .dateEvent {
    @include not-mobile {
      grid-area: dateEvent;
    }
  }

  .schedule {
    @include not-mobile {
      grid-area: schedule;
      flex-wrap: nowrap;
    }
  }
  .informations {
    margin-bottom: var(--spacing-lg);
    @include not-mobile {
      grid-area: informations;
    }
    > div.dsp-flex {
      > div.dsp-flex {
        flex: 1 1 0;
        > div.dsp-flex {
          margin-right: var(--spacing-md);
        }
      }
    }

    .categories {
      flex-basis: 100%;
    }
  }
  .address {
    @include not-mobile {
      grid-area: address;
    }
  }

  .dateEvent,
  .schedule {
    > .dsp-flex:not(:first-child) {
      width: 100%;
      @include not-mobile {
        flex-wrap: nowrap;
      }
      > .dsp-flex {
        margin-left: var(--spacing-md);

        &:first-child {
          min-width: var(--spacing-3xl);
        }
      }
    }
  }
}
</style>
