<script>
export default { name: 'EventModal' };
</script>

<script setup>
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
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="onModalClose()">
    <dsp-center>
      <h2>
        {{ t(event ? 'event.title.edit' : 'event.title.create') }}
      </h2>
    </dsp-center>
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
          <dsp-flex wrap="nowrap">
            <dsp-flex>
              <dsp-smart-form-field
                v-slot="slotProps"
                name="title"
                :initial-value="event?.title || ''"
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
                    :options="queryLocation?.data?.value"
                    :multiple="false"
                    v-bind="formControlProps"
                    v-on="on"
                  />
                </dsp-form-control>
              </dsp-smart-form-field>
              <dsp-smart-form-field
                v-slot="slotProps"
                name="categories"
                :initial-value="event?.categories"
                required
              >
                <dsp-form-control
                  v-slot="{ on, ...formControlProps }"
                  v-model="slotProps.field.value"
                  v-bind="slotProps"
                  :label="t('event.label.category')"
                >
                  <dsp-select
                    v-model="slotProps.field.value"
                    :options="queryCategories?.data?.value"
                    :multiple="true"
                    v-bind="formControlProps"
                    v-on="on"
                  />
                </dsp-form-control>
              </dsp-smart-form-field>
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
    grid-template-columns: 4fr 3fr;
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
    @include not-mobile {
      grid-area: informations;
    }
    > div.dsp-flex {
      > div.dsp-flex {
        > div.dsp-flex {
          margin-right: var(--spacing-md);
        }
      }
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