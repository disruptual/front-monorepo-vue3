<script>
export default { name: 'AdminEventDetails' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useEventApi } from '@dsp/core';
const { t } = useI18n();

const props = defineProps({
  id: { type: String, required: true }
});

const query = useEventApi().findByIdQuery(props.id, {
  requestOptions: { params: { display: 'all' } }
});

const labelState = event => {
  if (!event.hasStarted) return t('event.details.notStarted');
  if (event.isInProgress) return t('event.details.inProgress');
  if (event.isFinished) return t('event.details.complete');
};
const statusClass = bool => {
  if (!bool) return;
  return 'event-status--active';
};
const classState = event => {
  if (!event.hasStarted) return 'event-status--not-started';
  if (event.isInProgress) return 'event-status--in-progress';
  if (event.isFinished) return 'event-status--finished';
};
</script>

<template>
  <dsp-query-loader v-slot="{ entity: event }" :query="query">
    <dsp-container>
      <dsp-center>
        <h2>{{ event.title }}</h2>
      </dsp-center>
      <div class="event-details">
        <dsp-surface as="section" class="event-details__dateEvent">
          <dsp-center>
            <h2>
              {{ t(`event.details.title.dateEvent`) }}
            </h2>
          </dsp-center>
          <dsp-flex justify="space-around" gap="sm" wrap="nowrap">
            <dsp-flex direction="column" align="center" class="card">
              <h3>{{ t('event.details.title.digitalDeposit') }}</h3>
              <dsp-icon
                :class="statusClass(event.isDigitalPeriod)"
                size="xl"
                icon="calendar"
              />
              <p class="date">
                {{
                  t('event.details.startEndAt', {
                    startAt: event.formatDigitalSubmissionStartAt(),
                    endAt: event.formatDigitalSubmissionEndAt()
                  })
                }}
              </p>
            </dsp-flex>
            <dsp-flex direction="column" align="center" class="card">
              <h3>{{ t('event.details.title.physicalDeposit') }}</h3>
              <dsp-icon
                :class="statusClass(event.isPhysicalPeriod)"
                size="xl"
                icon="calendar"
              />
              <p class="date">
                {{
                  t('event.details.startEndAt', {
                    startAt: event.formatPhysicalSubmissionStartAt(),
                    endAt: event.formatPhysicalSubmissionEndAt()
                  })
                }}
              </p>
            </dsp-flex>
            <dsp-flex direction="column" align="center" class="card">
              <h3>{{ t('event.details.title.sale') }}</h3>
              <dsp-icon
                :class="statusClass(event.isSalesPeriod)"
                size="xl"
                icon="calendar"
              />
              <p class="date">
                {{
                  t('event.details.startEndAt', {
                    startAt: event.formatSalesStartAt(),
                    endAt: event.formatSalesEndAt()
                  })
                }}
              </p>
            </dsp-flex>
          </dsp-flex>
          <dsp-flex class="state-action">
            <dsp-flex class="state" :class="classState(event)" align="center">
              <span>{{ labelState(event) }}</span>
              <span class="icon" />
            </dsp-flex>
          </dsp-flex>
        </dsp-surface>
        <dsp-surface as="section" class="event-details__informations">
          <dsp-center>
            <h2>{{ t(`event.details.title.informations`) }}</h2>
          </dsp-center>
          <dl>
            <dt>{{ t(`event.details.label.description`) }}</dt>
            <dd>{{ event.content }}</dd>

            <dt>{{ t(`event.details.label.numArticles`) }}</dt>
            <dd>
              {{ event.numberOfItems }}
            </dd>

            <dt>{{ t(`event.details.label.numUserMarked`) }}</dt>
            <dd>
              {{ event.numberOfMarkedUser }}
            </dd>

            <dt>{{ t(`event.details.label.location`) }}</dt>
            <dd>
              <span>{{ event.location.name }}</span>
              <br />
              <span>{{ event.location.address.route }}</span>
              <br />
              <span>{{ event.location.address.postalCode + ' ' }}</span>
              <span>{{ event.location.address.city }}</span>
            </dd>
          </dl>
        </dsp-surface>
        <dsp-surface as="section" class="event-details__schedule">
          <dsp-center>
            <h2>{{ t(`event.details.title.schedule`) }}</h2>
          </dsp-center>
          <dl>
            <dt>{{ t(`event.details.day.monday`) }}</dt>
            <dd>{{ event.schedule.MONDAY }}</dd>

            <dt>{{ t(`event.details.day.tuesday`) }}</dt>
            <dd>{{ event.schedule.TUESDAY }}</dd>

            <dt>{{ t(`event.details.day.wednesday`) }}</dt>
            <dd>{{ event.schedule.WEDNESDAY }}</dd>

            <dt>{{ t(`event.details.day.thursday`) }}</dt>
            <dd>{{ event.schedule.THURSDAY }}</dd>

            <dt>{{ t(`event.details.day.friday`) }}</dt>
            <dd>{{ event.schedule.FRIDAY }}</dd>

            <dt>{{ t(`event.details.day.saturday`) }}</dt>
            <dd>{{ event.schedule.SATURDAY }}</dd>

            <dt>{{ t(`event.details.day.sunday`) }}</dt>
            <dd>{{ event.schedule.SUNDAY }}</dd>
          </dl>
        </dsp-surface>
      </div>
    </dsp-container>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.event-details {
  display: grid;
  grid-gap: var(--spacing-md);

  @include not-mobile {
    grid-template-columns: minmax(0, 7fr) 3fr;
    grid-template-areas:
      'dateEvent schedule'
      'informations schedule';
  }
}

.event-details__dateEvent {
  position: relative;
  @include not-mobile {
    grid-area: dateEvent;
  }

  .state-action {
    position: absolute;
    top: 0;
    left: 0;
    margin: var(--spacing-sm);
    .state {
      text-transform: uppercase;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-sm);
    }
  }
}
.event-details__schedule {
  @include not-mobile {
    grid-area: schedule;
  }
}
.event-details__informations {
  @include not-mobile {
    grid-area: informations;
  }
}

dl {
  @include desktop-only {
    display: grid;
    grid-template-columns: minmax(7em, auto) minmax(10em, auto);
    grid-column-gap: var(--spacing-md);
  }

  > *:nth-child(odd) {
    font-weight: var(--font-weight-light);
  }
}

dd {
  margin-left: 0;
  margin-bottom: var(--spacing-sm);
}

.event-details__schedule dd {
  text-align: end;
}

h3 {
  font-size: var(--font-size-lg);
}

.date {
  font-size: var(--font-size-sm);
  text-align: center;
}

.event-status {
  &--active {
    color: var(--color-success-400);
    :deep(svg) {
      path {
        fill: var(--color-success-400);
      }
    }
  }
  &--not-started {
    color: var(--color-error-400);
    .icon {
      background-color: var(--color-error-400);
    }
    :deep(svg) {
      path {
        fill: var(--color-error-400);
      }
    }
  }
  &--in-progress {
    color: var(--color-warning-500);
    .icon {
      background-color: var(--color-warning-500);
    }
    :deep(svg) {
      path {
        fill: var(--color-warning-500);
      }
    }
  }
  &--finished {
    color: var(--color-success-400);
    .icon {
      background-color: var(--color-success-400);
    }
    :deep(svg) {
      path {
        fill: var(--color-success-400);
      }
    }
  }
}

.icon {
  width: 18px;
  height: 18px;
  margin-left: var(--spacing-sm);
  position: relative;
  border-radius: var(--border-radius-circle);
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid var(--color-surface);
    width: 14px;
    height: 14px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border-radius: var(--border-radius-circle);
  }
}

.info {
  margin-left: var(--spacing-sm);
}
</style>
